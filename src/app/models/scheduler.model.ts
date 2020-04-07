export interface Schedule {
    id: string;
    maxVolunteer: number;
    totalVolunteers: number;
    date: string;
    hours: ScheduleTime;
}

export interface ScheduleTime {
    begin: string;
    end: string;
}

export interface ScheduleDates {
    title?: string;
    data: Schedule[];
}

export interface ScheduleData {
    id: string;
    data: string;
    maxVolunteer: number;
    totalVolunteers: number;
}

export interface SchedulingDone {
    idUser: string;
    idShift: string;
}

export interface IUserScheduleData {
    data: IUserScheduleInfo[];
}

export interface IUserScheduleInfo {
    idUser: string;
    idShift: string;
    id: string;
}

export interface IScheduleTurn {
    begin: string;
    end: string;
    maxVolunteers?: number;
    totalVolunteers?: number;
    id: string;
}

export interface IUserSchedule {
    data: IScheduleTurn;
}
