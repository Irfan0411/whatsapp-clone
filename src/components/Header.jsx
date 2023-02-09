import { IonIcon } from '@ionic/react';
import React from 'react';
import { cameraOutline, searchOutline, ellipsisVertical } from 'ionicons/icons'
import { useContext } from 'react';
import { HideContext } from '../context/HideContext';

const Header = () => {
    const {dispatch} = useContext(HideContext);
    return (
        <header>
            <h1 className="logo">WhatsApp</h1>
            <div className="action">
                <span><IonIcon icon={cameraOutline}/></span>
                <span><IonIcon icon={searchOutline}/></span>
                <span><IonIcon onClick={()=>dispatch("OPEN_TOOLBOX")} icon={ellipsisVertical}/></span>
            </div>
        </header>
    )
}

export default Header