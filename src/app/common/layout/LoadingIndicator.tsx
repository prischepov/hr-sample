import { Dimmer, Loader } from 'semantic-ui-react'

interface Props {
    text?: string;
}

export default function LoadingIndicator({text = 'Loading...'}: Props) {
    return (
        <Dimmer active={true} inverted={true} >
            <Loader content={text} />
        </Dimmer>
    )
}
