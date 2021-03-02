import {Entity, PrimaryGeneratedColumn, Column, Unique} from "typeorm";

@Entity()
@Unique('sales_unique_key', ["saleId"])
export class Sales {

   @PrimaryGeneratedColumn()
   id: number;

   @Column({ type: 'varchar', comment: 'уникальный идентификатор продажи/возврата (SXXXXXXXXXX — продажа, RXXXXXXXXXX — возврат, DXXXXXXXXXXX — доплата)' })
   saleId: string;

   @Column({ type: 'varchar', comment: 'номер документа', default: '' })
   number: string;

   @Column({ type: 'varchar', comment: 'дата продажи', default: '' })
   date: string;

   @Column({ type: 'varchar', comment: 'дата время обновления информации в сервисе', default: '' })
   lastChangeDate: string;

   @Column({ type: 'varchar', comment: 'ваш артикул', default: '' })
   supplierArticle: string;

   @Column({ type: 'varchar', comment: 'размер', default: '' })
   techSize: string;

   @Column({ type: 'varchar', comment: 'штрих-код', default: '' })
   barcode: string;

   @Column({ type: 'varchar', comment: 'кол-во', default: '' })
   quantity: string;

   @Column({ type: 'varchar', comment: 'начальная розничная цена товара', default: '' })
   totalPrice: string;

   @Column({ type: 'varchar', comment: 'согласованная скидка на товар', default: '' })
   discountPercent: string;

   @Column({ type: 'varchar', comment: 'договор поставки', default: '' })
   isSupply: string;

   @Column({ type: 'varchar', comment: 'договор реализации', default: '' })
   isRealization: string;

   @Column({ type: 'varchar', comment: 'номер исходного заказа ("Номер заказа" из сервиса "Заказы")', default: '' })
   orderId: string;

   @Column({ type: 'varchar', comment: 'согласованный промокод', default: '' })
   promoCodeDiscount: string;

   @Column({ type: 'varchar', comment: 'склад отгрузки', default: '' })
   warehouseName: string;

   @Column({ type: 'varchar', comment: 'страна', default: '' })
   countryName: string;

   @Column({ type: 'varchar', comment: 'округ', default: '' })
   oblastOkrugName: string;

   @Column({ type: 'varchar', comment: 'регион', default: '' })
   regionName: string;

   @Column({ type: 'varchar', comment: 'номер поставки', default: '' })
   incomeId: string;

   @Column({ type: 'varchar', comment: 'уникальный идентификатор позиции заказа', default: '' })
   odId: string;

   @Column({ type: 'varchar', comment: 'согласованная скидка постоянного покупателя (СПП)', default: '' })
   spp: string;

   @Column({ type: 'varchar', comment: 'к перечислению поставщику', default: '' })
   forPay: string;

   @Column({ type: 'varchar', comment: 'фактическая цена из заказа (с учетом всех скидок, включая и от ВБ)', default: '' })
   finishedPrice: string;

   @Column({ type: 'varchar', comment: 'цена, от которой считается вознаграждение поставщика forpay (с учетом всех согласованных скидок)', default: '' })
   priceWithDisc: string;

   @Column({ type: 'varchar', comment: 'код WB', default: '' })
   nmId: string;

   @Column({ type: 'varchar', comment: 'предмет', default: '' })
   subject: string;

   @Column({ type: 'varchar', comment: 'категория', default: '' })
   category: string;

   @Column({ type: 'varchar', comment: 'бренд', default: '' })
   brand: string;

   @Column({ type: 'varchar', comment: '1-продажа сторнирована, 0 – не сторнирована', default: '' })
   isStorno: string;
}
