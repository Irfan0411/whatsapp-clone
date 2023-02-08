import React from 'react';
import { IonIcon } from '@ionic/react';
import { link } from 'ionicons/icons';
import BlockCalls from './BlockCalls';

const BoxCalls = () => {
  return (
    <div className="box calls">
        <div className="data">
            <div className="chatlist">
                <div className="block">
                    <div className="imgbox green">
                        <IonIcon icon={link} />
                    </div>
                    <div className="details">
                        <div className="listHead">
                            <h4>Create a call link</h4>
                        </div>
                        <div className="message_p">
                            <p>Share a link for your WhatsApp call</p>
                        </div>
                    </div>
                </div>
                <label>Recent</label>
                <BlockCalls />
            </div>
        </div>
    </div>
  )
}

export default BoxCalls