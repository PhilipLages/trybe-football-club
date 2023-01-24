export default interface GetTeamsProps {
  status: number,
  data: Array<{
    id: number,
    teamName: string
  }>
}
