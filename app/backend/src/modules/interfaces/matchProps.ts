import Match from '../../database/models/Match';
import IStatus from './statusProps';

export interface AllMatches extends IStatus {
  data: Match[]
}
