import React from 'react'
import BlockStatus from './BlockStatus'

const BoxStatus = () => {
  return (
    <div className="box status">
        <div className="data">
            <div className="chatlist">
                <div className="block">
                    <div className="imgbox">
                        <img src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/97/97a8eb1cd8a4c1e7693559c17ae083f1d2363e30_full.jpg" alt="" />
                    </div>
                    <div className="plus">+</div>
                    <div className="details">
                        <div className="listHead">
                            <h4>My Status</h4>
                        </div>
                        <div className="message_p">
                            <p>Tap to add status update</p>
                        </div>
                    </div>
                </div>
                <label>Recent Updates</label>
                    <BlockStatus />
                    <BlockStatus />
                    <BlockStatus />
                <label>Viewed Updates</label>
                    <BlockStatus />
                    <BlockStatus />
            </div>
        </div>
    </div>
  )
}

export default BoxStatus