interface IStatus {
  status: number;
}

export interface GetTeamsProps extends IStatus {
  data: Array<{
    id: number,
    teamName: string
  }>
}

export interface ITeam extends IStatus{
  data: {
    id?: number,
    teamName?: string,
    message?: string
  }
}
