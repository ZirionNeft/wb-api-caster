import {Entity, PrimaryGeneratedColumn, Column, Unique} from "typeorm";

@Entity()
@Unique('orders_unique_key', ["odId"])
export class Orders {

   @PrimaryGeneratedColumn()
   id: number;

   @Column({ type: 'varchar', comment: 'уникальный идентификатор позиции заказа' })
   odId: string;

   @Column({ type: 'varchar', comment: 'номер заказа', default: '' })
   number: string;

   @Column({ type: 'varchar', comment: 'дата заказа', default: '' })
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

   @Column({ type: 'varchar', comment: 'цена до согласованной скидки/промо/спп', default: '' })
   totalPrice: string;

   @Column({ type: 'varchar', comment: 'согласованный итоговый дисконт', default: '' })
   discountPercent: string;

   @Column({ type: 'varchar', comment: 'склад отгрузки', default: '' })
   warehouseName: string;

   @Column({ type: 'varchar', comment: 'область', default: '' })
   oblast: string;

   @Column({ type: 'varchar', comment: 'номер поставки', default: '' })
   incomeId: string;

   @Column({ type: 'varchar', comment: 'Код WB', default: '' })
   nmId: string;

   @Column({ type: 'varchar', comment: 'предмет', default: '' })
   subject: string;

   @Column({ type: 'varchar', comment: 'категория', default: '' })
   category: string;

   @Column({ type: 'varchar', comment: 'бренд', default: '' })
   brand: string;

   @Column({ type: 'varchar', comment: 'признак отмены заказа (0 – отмены не было, 1 – отмена была)', default: '' })
   isCancel: string;

   @Column({ type: 'varchar', comment: 'дата отмены заказа', default: '' })
   cancelDt: string;

   @Column({ type: 'varchar', default: '' })
   gNumber: string;
}
