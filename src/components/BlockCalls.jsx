import { IonIcon } from '@ionic/react'
import { arrowUp, call } from 'ionicons/icons'
import React from 'react'

const Blockcalls = () => {
  return (
    <div className="block">
        <div className="imgbox">
            <img src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/97/97a8eb1cd8a4c1e7693559c17ae083f1d2363e30_full.jpg" alt="" />
        </div>
        <div className="details">
            <div className="listHead">
                <h4>Irfan Faqih</h4>
            </div>
            <div className="message_p incoming">
                <p><IonIcon icon={arrowUp}/>28/11/2022, 10:11</p>
            </div>
        </div>
        <IonIcon icon={call} className="call"/>
    </div>
  )
}

export default Blockcalls