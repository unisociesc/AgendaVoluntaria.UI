export interface IScheduleDetailsData {
    data: IScheduleDetails[];
}

export interface IScheduleDetails {
    id: string;
    maxVolunteer: number;
    totalVolunteers: number;
    date: string;
    hours: IScheduleInterval;
    users: IVolunteerUserInfo[];
}

export interface IScheduleInterval {
    begin: string;
    end: string;
}

export interface IVolunteerUserInfo {
    name: string;
    cpf: string;
    phone: string;
    email: string;
}
