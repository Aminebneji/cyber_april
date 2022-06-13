export class reservationModel
{
    //Id/IdUser/IdPc/StartDate/EndDate
    id: number;
    idUser: number;
    idPC: number;
    DateDebut: Date;
    DateFin: Date;

    constructor(id: number, idUser: number, idPc: number, startDate: Date, endDate: Date)
    {
        this.id = id;
        this.idUser = idUser;
        this.idPC = idPc;
        this.DateDebut = startDate;
        this.DateFin = endDate;
    }
}