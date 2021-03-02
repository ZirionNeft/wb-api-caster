import {Entity, PrimaryGeneratedColumn, Column, Unique} from "typeorm";

@Entity()
@Unique('incomes_unique_key', ["incomeId"])
export class Incomes {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', comment: 'Номер поставки' })
    incomeId: string;

    @Column({ type: 'varchar', comment: 'Номер УПД', default: '' })
    number: string;

    @Column({ type: 'varchar', comment: 'Дата поступления', default: '' })
    date: string;

    @Column({ type: 'varchar', comment: 'Дата и время обновления информации в сервисе', default: '' })
    lastChangeDate: string;

    @Column({ type: 'varchar', comment: 'Ваш артикул (поставщика)', default: '' })
    supplierArticle: string;

    @Column({ type: 'varchar', comment: 'Размер', default: '' })
    techSize: string;

    @Column({ type: 'varchar', comment: 'Штрих-код', default: '' })
    barcode: string;

    @Column({ type: 'varchar', comment: 'Количество', default: '' })
    quantity: string;

    @Column({ type: 'varchar', comment: 'Цена из УПД', default: '' })
    totalPrice: string;

    @Column({ type: 'varchar', comment: 'Дата принятия (закрытия) у WB', default: '' })
    dateClose: string;

    @Column({ type: 'varchar', comment: 'Название склада', default: '' })
    warehouseName: string;

    @Column({ type: 'varchar', comment: 'Код WB', default: '' })
    nmId: string;

    @Column({ type: 'varchar', comment: 'Текущий статус поставки', default: '' })
    status: string;
}
