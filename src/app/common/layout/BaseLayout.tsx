import { ReactNode } from 'react';
import './BaseLayout.css';

interface Props {
    children: ReactNode
}

const BaseLayout = ( {children}: Props) => (
    <div className="content_wrapper">
        {children}
    </div>
)

export default BaseLayout