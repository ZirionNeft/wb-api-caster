import {ApiMethod, WildberriesApi} from "./wildberries-api";
import * as dotenv from 'dotenv';
import "reflect-metadata";
import {Connection, createConnection} from "typeorm";
import {Stocks} from "./entity/Stocks";
import {Incomes} from "./entity/Incomes";
import {Orders} from "./entity/Orders";
import {Sales} from "./entity/Sales";
import {ReportDetailByPeriod} from "./entity/ReportDetailByPeriod";

dotenv.config();

const lastWeek = new Date(new Date().setDate(new Date().getDate()-7));
const lastMonth = new Date(new Date().setMonth(new Date().getMonth()-1));
const lastYear = new Date(new Date().setFullYear(new Date().getFullYear()-1))

const requests = [
   {
      time: [[6,15], [11,20], [16,20]],
      name: 'stocks'
   },
   {
      date: 4, // 4 число месяца
      time: [[6,15]],
      intervalFlag: true, // 30 min interval
      name: 'orders'
   },
   {
      date: 4,
      time: [[6,15]],
      intervalFlag: true, // 30 min interval
      name: 'sales'
   },
   {
      time: [[11,20]],
      name: 'reportDetailByPeriod'
   }
];

const fieldsToOverwrite = {
   'incomes': [
      'number', 'date', 'lastChangeDate', 'supplierDate', 'supplierArticle',
      'techSize', 'barcode', 'quantity', 'totalPrice', 'dateClose', 'warehouseName',
      'nmId', 'status'
   ],
   'stocks': [
      'lastChangeDate', 'techSize', 'barcode', 'quantity', 'isSupply', 'isRealization',
      'quantityFull', 'quantityNotInOrders', 'inWayToClient', 'inWayFromClient', 'nmId',
      'subject', 'category', 'daysOnSite', 'brand', 'SCCode'
   ],
   'orders': [
      'date', 'lastChangeDate', 'supplierArticle', 'techSize', 'barcode', 'quantity',
      'totalPrice', 'discountPercent', 'warehouseName', 'oblast', 'incomeId', 'odId',
      'nmId', 'subject', 'category', 'brand', 'isCancel', 'cancelDt', 'gNumber'
   ],
   'sales': [
      'number', 'date', 'lastChangeDate', 'supplierArticle', 'techSize', 'barcode', 'quantity',
      'totalPrice', 'discountPercent', 'isSupply', 'isRealization', 'orderId', 'promoCodeDiscount',
      'warehouseName', 'countryName', 'oblastOkrugName', 'regionName', 'incomeId', 'odId', 'spp',
      'forPay', 'finishedPrice', 'priceWithDisc', 'nmId', 'subject', 'category', 'brand', 'isStorno'
   ],
   'reportDetailByPeriod': [
      'supplierContractCode', 'rrDt', 'giId', 'subjectName', 'NMId', 'brandName', 'saName',
      'tsName', 'barcode', 'docTypeName', 'quantity', 'nds', 'costAmount', 'retailPrice', 'retailAmount',
      'retailCommission', 'salePercent', 'commissionPercent', 'customerReward', 'supplierReward', 'officeName',
      'supplierOperName', 'orderDt', 'saleDt', 'shkId', 'retailPriceWithDiscRub', 'forPay', 'forPayNds',
      'deliveryAmount', 'returnAmount', 'deliveryRub', 'giBoxTypeName', 'productDiscountForReport',
      'supplierPromo', 'supplierSpp'
   ]
};

const main = async () => {
   const wb = new WildberriesApi(process.env.WB_API);
   let connection: Connection;
   try {
      console.info('[Database] Connecting to Postgres...');
      connection = await createConnection();
      console.info('[Database] Successfully connected!');
   } catch (e) {
      console.error(e);
      process.exit(1);
   }

   const save = async (data: any[], entity: Function, method: ApiMethod) => {
      const constraintColumns = {
         [Incomes.name]: ['incomeId'],
         [Stocks.name]: ['warehouseName', 'supplierArticle'],
         [Orders.name]: ['odId'],
         [Sales.name]:  ['saleId'],
         [ReportDetailByPeriod.name]: ['rrdId']
      }

      const saveResult = await connection.createQueryBuilder().insert().into(entity).values(data)
         .orUpdate({
            conflict_target: constraintColumns[entity.name],
            overwrite: fieldsToOverwrite[method]
         }).execute();
      console.info(`[Database] ${method.toUpperCase()}: Saved ${saveResult.identifiers.length} items!`);
   }

   console.info('[INFO] >>>>> Performing all API-methods for getting data for the last year because service is running up for the first time')
   for (const m of ['incomes', 'stocks', 'orders', 'sales', 'reportDetailByPeriod']) {
      try {
         const res = await wb.performApiMethod(m as ApiMethod, lastYear);
         await save(res, {
            'incomes': Incomes,
            'stocks': Stocks,
            'orders': Orders,
            'sales': Sales,
            'reportDetailByPeriod': ReportDetailByPeriod
         }[m], m as ApiMethod);
      } catch (e) {
         console.error(e);
      }
   }

   const checkTime = (method: string) => {
      const utcHour = new Date().getUTCHours();
      const utcMin = new Date().getUTCMinutes();
      return requests.find(e => e.name === method)?.time.some(
         ([h, m]: [number, number]) => (h === utcHour && (utcMin <= m+8 && utcMin >= m-8)));
   }

   const checkForDateAndInterval = async (method: string) => {
      const params = requests.find((e) => e.name === method);
      // Updates every +-30 min (interval 15 min - then check for even iterations with the IntervalFlag)
      const dateCheck = new Date().getUTCDate() === params?.date;
      const check = dateCheck && checkTime(method);
      if (check || (params.intervalFlag = !params?.intervalFlag)) {
         // get data for the latest month if days in params are equals
         return wb.performApiMethod(method as ApiMethod, check ? lastMonth : lastWeek);
      } else {
         console.log(`[INFO] ${method.toUpperCase()}: Not requested because date and time not matches or this request one is odd (30 min not passed)`);
      }
      return [];
   }

   setInterval(async () => {
      console.info('[INFO] 15 min have passed, time to check out API');

      try {
         // Update every 15 min
         const incomesResult = await wb.getIncomesData(lastYear); // Get for last year because WB response is constant empty(?)
         await save(incomesResult, Incomes, 'incomes' as ApiMethod);
      } catch (e) {
         console.error(e);
      }


      try {
         // Update in const time
         if (checkTime('stocks')) {
            const stocksResult = await wb.getStocksData(lastWeek);
            await save(stocksResult, Stocks, 'stocks' as ApiMethod);
         } else {
            console.log(`[INFO] STOCKS: Not requested because const time [${requests.find(e => e.name === 'stocks')?.time.map(e => e[0] + ':' + e[1])}] is not matches`)
         }
      } catch (e) {
         console.error(e);
      }

      try {
         const ordersResult = await checkForDateAndInterval('orders');
         await save(ordersResult, Orders, 'orders' as ApiMethod);
      } catch (e) {
         console.error(e);
      }

      try {
         const salesResult = await checkForDateAndInterval('sales');
         await save(salesResult, Sales, 'sales' as ApiMethod);
      } catch (e) {
         console.error(e);
      }

      try {
         if (checkTime('reportDetailByPeriod')) {
            const reportDetailsData = await wb.getReportDetailByPeriodData(lastWeek);
            await save(reportDetailsData, ReportDetailByPeriod, 'reportDetailByPeriod' as ApiMethod);
         } else {
            console.log(`[INFO] RDBP: Not requested because const time [${requests.find(e => e.name === 'reportDetailByPeriod')?.time.map(e => e[0] + ':' + e[1])}] is not matches`)
         }
      } catch (e) {
         console.error(e);
      }

   }, 15 * 60 * 1000);
};

main();

process.stdin.resume();
console.log('[INFO] Process started in waiting mode. Press "Ctrl+C" to stop it')