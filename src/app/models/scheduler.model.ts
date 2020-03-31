export interface Schedule {
    begin: string;
    end: string;
    maxVolunteer: number;
    totalVolunteers: number;
    id: string;
    createAt: string;
    updateAt: string;
}

export interface ScheduleDates {
    title?: string;
    data: Schedule[];
}

export interface ScheduleData {
    horarioInicio: string;
    horarioFim: string;
    dataInicio: string;
    dataFim: string;
    maxVolunteer: number;
    totalVolunteers: number;
    id: string;
}

export interface SchedulingDone {
    idVolunteer: string;
    idShift: string;
}
