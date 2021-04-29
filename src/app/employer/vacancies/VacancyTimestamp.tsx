import { Icon, Label } from "semantic-ui-react";
import { Vacancy } from "../../models/Vacancy";

interface Props {
    vacancy: Vacancy
}

export default function VacancyTimestamp ({vacancy}: Props) {

    function format(timestamp: Date | undefined) {
        if(!timestamp){
            return '';
        }
        return new Date(timestamp).toLocaleString();
    }

    return (
        <Label color={vacancy.isClosed ? 'red' : 'green'}>
            <Icon name="clock" />
            { vacancy.isClosed 
                ? `${vacancy.closureReason} ${format(vacancy.closedTimestamp)}` 
                : `published ${format(vacancy.publishedTimestamp)}` }
        </Label>
    )
}