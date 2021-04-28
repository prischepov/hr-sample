import { ReactNode } from 'react';
import './BaseLayout.css';

interface Props {
    children: ReactNode
}

export default function BaseLayout({children}: Props){
    
    return (
        <div className="content_wrapper">
            {children}
        </div>
    )
}