import {Entity, PrimaryGeneratedColumn, Column, Unique} from "typeorm";

@Entity()
@Unique('stocks_unique_pair', ['warehouseName', 'supplierArticle'])
export class Stocks {

   @PrimaryGeneratedColumn()
   id: number;

   @Column({ type: 'varchar', comment: 'дата и время обновления информации в сервисе', default: '' })
   lastChangeDate: string;

   @Column({ type: 'varchar', comment: 'ваш артикул' })
   supplierArticle: string;

   @Column({ type: 'varchar', comment: 'размер', default: '' })
   techSize: string;

   @Column({ type: 'varchar', comment: 'штрих-код', default: '' })
   barcode: string;

   @Column({ type: 'varchar', comment: 'кол-во, доступное для продажи', default: '' })
   quantity: string;

   @Column({ type: 'varchar', comment: 'договор поставки', default: '' })
   isSupply: string;

   @Column({ type: 'varchar', comment: 'договор реализации', default: '' })
   isRealization: string;

   @Column({ type: 'varchar', comment: 'кол-во полное', default: '' })
   quantityFull: string;

   @Column({ type: 'varchar', comment: 'кол-во не в заказе', default: '' })
   quantityNotInOrders: string;

   @Column({ type: 'varchar', comment: 'название склада', default: '' })
   warehouseName: string;

   @Column({ type: 'varchar', comment: 'в пути к клиенту (штук)', default: '' })
   inWayToClient: string;

   @Column({ type: 'varchar', comment: 'в пути от клиента (штук)', default: '' })
   inWayFromClient: string;

   @Column({ type: 'varchar', comment: 'код WB', default: '' })
   nmId: string;

   @Column({ type: 'varchar', comment: 'предмет', default: '' })
   subject: string;

   @Column({ type: 'varchar', comment: 'категория', default: '' })
   category: string;

   @Column({ type: 'varchar', comment: 'кол-во дней на сайте', default: '' })
   daysOnSite: string;

   @Column({ type: 'varchar', comment: 'бренд', default: '' })
   brand: string;

   @Column({ type: 'varchar', comment: 'код контракта', default: '' })
   SCCode: string;
}
