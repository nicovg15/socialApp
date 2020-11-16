import React from 'react'
import '../../css/HomeComponents/Trending.css'
import {TwitterTimelineEmbed, TwitterTweetEmbed} from 'react-twitter-embed'

function Trending() {
    return (
        <div className="trending">
           <div>
                <h1>What's happening</h1>
                <TwitterTweetEmbed tweetId={"1271096187559567360"} />
                <div className="trending-div"></div>
                <TwitterTimelineEmbed
                    sourceType='profile'
                    screenName='twitter'
                    options={{height: 300}}
                />
           </div>
        </div>
    )
}

export default Trending
