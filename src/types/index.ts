export interface Teams {
    id: string;
    name: string;
}

export interface TeamOverview {
    id: string;
    teamLeadId: string;
    teamMemberIds: string[];
}

export interface TeamInfoState {
    teamLead?: UserData;
    teamMembers?: UserData[];
}

export interface UserData {
    id: string;
    firstName: string;
    lastName: string;
    displayName: string;
    location: string;
    avatar: string;
}

export interface ListItemColumn {
    key: string;
    value: string;
}

export interface ListItem {
    id: string;
    url?: string;
    dataRows: Array<ListItemColumn>;
    navigationProps?: UserData | Teams;
}
