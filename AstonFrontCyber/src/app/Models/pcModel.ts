export class pcModel
{
        //Id,Name,Serial,Cpu,RamCapacity,Gpu,Screen,ScreenAmount,Price
        id: number;
        name: string;
        serial: string;
        pcImage : string;
        cpu: componentClass;
        ramCapacity: string;
        gpu: componentClass;
        screen: ScreenResolution;
        screenAmount: number;
        price: number;
        
        constructor(id: number, name: string, serial: string, cpu: number, ramCapacity: string, gpu: number, screen: number, screenAmount: number, price: number, pcImage: string)
        {
            this.id = id;
            this.name = name;
            this.serial = serial;
            this.cpu = cpu;
            this.ramCapacity = ramCapacity;
            this.gpu = gpu;
            this.screen = screen;
            this.screenAmount = screenAmount;
            this.price = price;
            this.pcImage = pcImage;
        }
}

export enum componentClass
{
    low ,
    mid ,
    high ,
    ultra 
}

export enum ScreenResolution
    {
        HD720p60 ,
        FHD1080p60 ,
        FHD1080p144 ,
        QHD1440p60 ,
        QHD1440p144 ,
        UHD4K60  ,
        UHD4k144 ,
    }