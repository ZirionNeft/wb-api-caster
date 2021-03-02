import {Entity, PrimaryGeneratedColumn, Column, Unique} from "typeorm";

@Entity()
@Unique('RDBP_unique_key', ['rrdId'])
export class ReportDetailByPeriod {

   @PrimaryGeneratedColumn()
   id: number;

   @Column({ type: 'varchar', comment: 'Номер строки' })
   rrdId: string;

   @Column({ type: 'varchar', comment: 'Номер отчета', default: '' })
   realizationReportId: string;

   @Column({ type: 'varchar', comment: 'Договор', default: '' })
   supplierContractCode: string;

   @Column({ type: 'varchar', comment: 'Дата операции', default: '' })
   rrDt: string;

   @Column({ type: 'varchar', comment: 'номер поставки', default: '' })
   giId: string;

   @Column({ type: 'varchar', comment: 'Предмет', default: '' })
   subjectName: string;

   @Column({ type: 'varchar', comment: 'Артикул', default: '' })
   NMId: string;

   @Column({ type: 'varchar', comment: 'Бренд', default: '' })
   brandName: string;

   @Column({ type: 'varchar', comment: 'Артикул поставщика', default: '' })
   saName: string;

   @Column({ type: 'varchar', comment: 'Размер', default: '' })
   tsName: string;

   @Column({ type: 'varchar', comment: 'Баркод', default: '' })
   barcode: string;

   @Column({ type: 'varchar', comment: 'Тип документа', default: '' })
   docTypeName: string;

   @Column({ type: 'varchar', comment: 'Количество', default: '' })
   quantity: string;

   @Column({ type: 'varchar', comment: 'Ставка НДС', default: '' })
   nds: string;

   @Column({ type: 'varchar', comment: 'Себестоимость Сумма', default: '' })
   costAmount: string;

   @Column({ type: 'varchar', comment: 'Цена розничная', default: '' })
   retailPrice: string;

   @Column({ type: 'varchar', comment: 'Сумма продаж(Возвратов)', default: '' })
   retailAmount: string;

   @Column({ type: 'varchar', comment: 'Сумма комиссии продаж', default: '' })
   retailCommission: string;

   @Column({ type: 'varchar', comment: 'Согласованная скидка', default: '' })
   salePercent: string;

   @Column({ type: 'varchar', comment: 'Процент комиссии', default: '' })
   commissionPercent: string;

   @Column({ type: 'varchar', comment: 'Вознаграждение покупателю', default: '' })
   customerReward: string;

   @Column({ type: 'varchar', comment: 'Вознаграждение поставщику', default: '' })
   supplierReward: string;

   @Column({ type: 'varchar', comment: 'Склад', default: '' })
   officeName: string;

   @Column({ type: 'varchar', comment: 'Обоснование для оплаты', default: '' })
   supplierOperName: string;

   @Column({ type: 'varchar', comment: 'Даты заказа', default: '' })
   orderDt: string;

   @Column({ type: 'varchar', comment: 'Дата продажи', default: '' })
   saleDt: string;

   @Column({ type: 'varchar', comment: 'ШК', default: '' })
   shkId: string;

   @Column({ type: 'varchar', comment: 'Цена розничная с учетом согласованной скидки', default: '' })
   retailPriceWithDiscRub: string;

   @Column({ type: 'varchar', comment: 'К перечислению поставщику', default: '' })
   forPay: string;

   @Column({ type: 'varchar', comment: 'К перечислению поставщику НДС', default: '' })
   forPayNds: string;

   @Column({ type: 'varchar', comment: 'Кол-во доставок', default: '' })
   deliveryAmount: string;

   @Column({ type: 'varchar', comment: 'Кол-во возвратов', default: '' })
   returnAmount: string;

   @Column({ type: 'varchar', comment: 'Стоимость логистики', default: '' })
   deliveryRub: string;

   @Column({ type: 'varchar', comment: 'Тип коробов', default: '' })
   giBoxTypeName: string;

   @Column({ type: 'varchar', comment: 'Согласованный продуктовый дисконт', default: '' })
   productDiscountForReport: string;

   @Column({ type: 'varchar', comment: 'Промокод', default: '' })
   supplierPromo: string;

   @Column({ type: 'varchar', comment: 'Скидка постоянного покупателя', default: '' })
   supplierSpp: string;
}
