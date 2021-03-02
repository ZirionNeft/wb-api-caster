import axios from "axios";
import {Incomes} from "./entity/Incomes";
import {Orders} from "./entity/Orders";
import {Stocks} from "./entity/Stocks";
import {Sales} from "./entity/Sales";
import {ReportDetailByPeriod} from "./entity/ReportDetailByPeriod";

const apiUrl = 'https://suppliers-stats.wildberries.ru/api/v1/supplier/';

export type ApiMethod = 'incomes' | 'stocks' | 'orders' | 'sales' | 'reportDetailByPeriod';

export class WildberriesApi {

   constructor(private readonly apiKey: string) {}

   async getData(name: ApiMethod, date: Date, additional: string[] = []) {
      const url = apiUrl + name + '?key=' + this.apiKey + '&dateFrom=' + date.toISOString() + (additional.length ? ('&' + additional.join('&')) : '');
      console.log('GET: ' + url);
      const result = await axios.get(url);
      return result.data;
   }

   async performApiMethod(name: ApiMethod, date: Date) {
      switch (name) {
         case "incomes":
            return this.getIncomesData(date);
         case "orders":
            return this.getOrdersData(date);
         case "reportDetailByPeriod":
            return this.getReportDetailByPeriodData(date, true);
         case "sales":
            return this.getSalesData(date);
         case "stocks":
            return this.getStocksData(date);
      }
   }

   async getIncomesData(date: Date): Promise<Incomes[]> {
      const data: any[] = await this.getData('incomes', date);

      console.info(`[API-Method] INCOMES: received ${data.length} items. Saving into database...`);
      return data.map(e => {
         const incomes = new Incomes();

         incomes.incomeId = e.incomeid;
         incomes.number = e.Number;
         incomes.date = e.Date;
         incomes.lastChangeDate = e.lastChangeDate;
         incomes.supplierArticle = e.SupplierArticle;
         incomes.techSize = e.TechSize;
         incomes.barcode = e.Barcode;
         incomes.quantity = e.Quantity;
         incomes.totalPrice = e.totalPrice;
         incomes.dateClose = e.dateClose;
         incomes.warehouseName = e.warehouseName;
         incomes.nmId = e.nmid;
         incomes.status = e.status;

         return incomes;
      });
   }

   async getStocksData(date: Date): Promise<Stocks[]> {
      const data: any[] = await this.getData('stocks', date);

      console.info(`[API-Method] STOCKS: received ${data.length} items. Saving into database...`);
      return data.map(e => {
         const stocks = new Stocks();

         stocks.lastChangeDate = e.lastChangeDate;
         stocks.supplierArticle = e.supplierArticle;
         stocks.techSize = e.techSize;
         stocks.barcode = e.Barcode;
         stocks.quantity = e.Quantity;
         stocks.isSupply = e.isSupply;
         stocks.isRealization = e.isRealization;
         stocks.quantityFull = e.quantityFull;
         stocks.quantityNotInOrders = e.quantityNotInOrders;
         stocks.warehouseName = e.warehouseName;
         stocks.inWayToClient = e.inWayToClient;
         stocks.inWayFromClient = e.inWayFromClient;
         stocks.nmId = e.nmid;
         stocks.subject = e.subject;
         stocks.category = e.category;
         stocks.daysOnSite = e.DaysOnSite;
         stocks.brand = e.brand;
         stocks.SCCode = e.SCCode;

         return stocks;
      });
   }

   async getOrdersData(date: Date): Promise<Orders[]> {
      const data: any[] = await this.getData('orders', date);

      console.info(`[API-Method] ORDERS: received ${data.length} items. Saving into database...`);
      return data.map(e => {
         const order = new Orders();

         order.number = e.number;
         order.date = e.date;
         order.lastChangeDate = e.lastChangeDate;
         order.supplierArticle = e.supplierArticle;
         order.techSize = e.techSize;
         order.barcode = e.barcode;
         order.quantity = e.quantity;
         order.totalPrice = e.totalPrice;
         order.discountPercent = e.discountPercent;
         order.warehouseName = e.warehouseName;
         order.oblast = e.oblast;
         order.incomeId = e.incomeID;
         order.odId = e.odid;
         order.nmId = e.nmid;
         order.subject = e.subject;
         order.category = e.category;
         order.brand = e.brand;
         order.isCancel = e.is_cancel;
         order.cancelDt = e.cancel_dt;
         order.gNumber = e.gNumber;

         return order;
      });
   }

   async getSalesData(date: Date): Promise<Sales[]> {
      const data: any[] = await this.getData('sales', date);

      console.info(`[API-Method] SALES: received ${data.length} items. Saving into database...`);
      return data.map(e => {
         const sales = new Sales();

         sales.number = e.Number;
         sales.date = e.Date;
         sales.lastChangeDate = e.lastChangeDate;
         sales.supplierArticle = e.supplierArticle;
         sales.techSize = e.techSize;
         sales.barcode = e.barcode;
         sales.quantity = e.quantity;
         sales.totalPrice = e.totalPrice;
         sales.discountPercent = e.discountPercent;
         sales.isSupply = e.isSupply;
         sales.isRealization = e.isRealization;
         sales.orderId = e.orderId;
         sales.promoCodeDiscount = e.promoCodeDiscount;
         sales.warehouseName = e.warehouseName;
         sales.countryName = e.countryName;
         sales.oblastOkrugName = e.oblastOkrugName;
         sales.regionName = e.regionName;
         sales.incomeId = e.incomeID;
         sales.saleId = e.saleID;
         sales.odId = e.odid;
         sales.spp = e.spp;
         sales.forPay = e.forpay;
         sales.finishedPrice = e.finished_price;
         sales.priceWithDisc = e.pricewithdisc;
         sales.nmId = e.nmId;
         sales.subject = e.subject;
         sales.category = e.category;
         sales.brand = e.brand;
         sales.isStorno = e.IsStorno;

         return sales;
      });
   }

   async getReportDetailByPeriodData(date: Date, isOlderThanThreeMonths: boolean = false): Promise<ReportDetailByPeriod[]> {
      const data: any[] = await this.getData('reportDetailByPeriod', date, ['dateTo=' + new Date().toISOString(), isOlderThanThreeMonths ? 'flag=1' : '']);

      console.info(`[API-Method] RDBPD: received ${data.length} items. Saving into database...`);
      return data.map(e => {
         const reportDetailByPeriod = new ReportDetailByPeriod();

         reportDetailByPeriod.realizationReportId = e.realizationreport_id;
         reportDetailByPeriod.supplierContractCode = e.suppliercontract_code;
         reportDetailByPeriod.rrDt = e.rr_dt;
         reportDetailByPeriod.rrdId = e.rrd_id;
         reportDetailByPeriod.giId = e.gi_id;
         reportDetailByPeriod.subjectName = e.subject_name;
         reportDetailByPeriod.NMId = e.NM_id;
         reportDetailByPeriod.brandName = e.brand_name;
         reportDetailByPeriod.saName = e.sa_name;
         reportDetailByPeriod.tsName = e.ts_name;
         reportDetailByPeriod.barcode = e.barcode;
         reportDetailByPeriod.docTypeName = e.doc_type_name;
         reportDetailByPeriod.quantity = e.quantity;
         reportDetailByPeriod.nds = e.nds;
         reportDetailByPeriod.costAmount = e.cost_amount;
         reportDetailByPeriod.retailPrice = e.retail_price;
         reportDetailByPeriod.retailAmount = e.retail_amount;
         reportDetailByPeriod.retailCommission = e.retail_comission;
         reportDetailByPeriod.salePercent = e.sale_percent;
         reportDetailByPeriod.commissionPercent = e.commission_percent;
         reportDetailByPeriod.customerReward = e.customer_reward;
         reportDetailByPeriod.supplierReward = e.supplier_reward;
         reportDetailByPeriod.officeName = e.office_name;
         reportDetailByPeriod.supplierOperName = e.supplier_oper_name;
         reportDetailByPeriod.orderDt = e.order_dt;
         reportDetailByPeriod.saleDt = e.sale_dt;
         reportDetailByPeriod.shkId = e.shk_id;
         reportDetailByPeriod.retailPriceWithDiscRub = e.retail_price_withdisc_rub;
         reportDetailByPeriod.forPay = e.for_pay;
         reportDetailByPeriod.forPayNds = e.for_pay_nds;
         reportDetailByPeriod.deliveryAmount = e.delivery_amount;
         reportDetailByPeriod.returnAmount = e.return_amount;
         reportDetailByPeriod.deliveryRub = e.delivery_rub;
         reportDetailByPeriod.giBoxTypeName = e.gi_box_type_name;
         reportDetailByPeriod.productDiscountForReport = e.product_discount_for_report;
         reportDetailByPeriod.supplierPromo = e.supplier_promo;
         reportDetailByPeriod.supplierSpp = e.supplier_spp;

         return reportDetailByPeriod;
      });
   }
}