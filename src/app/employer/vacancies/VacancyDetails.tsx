import { Button, Card, Image } from 'semantic-ui-react'
import LoadingIndicator from '../../common/layout/LoadingIndicator';
import { useStore } from '../../stores/store'

export default function VacancyDetails() {

    const {vacanciesStore} = useStore();
    const vacancy = vacanciesStore.selectedVacancy;

    if(!vacancy) return <LoadingIndicator />;

    return (
        <Card>
            <Card.Content>
                <Image size="tiny" src={`../../assets/${vacancy.position}.png`} />
                <Card.Header>
                    {vacancy.position}
                </Card.Header>
                <Card.Meta>
                    { vacancy.isClosed 
                        ? `closed ${vacancy.closedTimestamp}` 
                        : `published ${vacancy.publishedTimestamp}` }
                </Card.Meta>
                <Card.Description>{vacancy.comment}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button basic color='grey' onClick={vacanciesStore.cancelVacancySelection}>
                    Back to list
                </Button>
            </Card.Content>
        </Card>
    )
}
