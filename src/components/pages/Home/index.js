import { daily } from '@/service'
import { util, http } from '@/base'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import { Card } from '@/components'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stories: [],
      locked: false,
      prevDate: Date.now(),
      scrollEvent: null,
    }
    this.handleScroll = this.handleScroll.bind(this)
    this.handleLoadMore = this.handleLoadMore.bind(this)
    this.handleMillionsToDate = this.handleMillionsToDate.bind(this)
  }

  componentWillMount() {
    if (this.state.locked) return
    this.handleLoadList({
      date: this.state.prevDate
    }).then(res => {
      this.setState({
        stories: res.stories || [],
      })
    }).catch(err => {
      console.log(err)
    })
  }

  componentDidMount() {
    let scrollEvent = util.debounce(this.handleScroll, 20)
    window.addEventListener('scroll', scrollEvent, false)
    this.setState({
      scrollEvent
    })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.state.scrollEvent, false)
  }

  handleScroll(event) {
    if (this.state.locked) return
    let scrollNode = document.scrollingElement ? document.scrollingElement : document.body
    if (scrollNode.scrollHeight - window.innerHeight - scrollNode.scrollTop < 500) {
      this.handleLoadMore()
    }
  }

  handleLoadMore() {
    this.locked = true
    this.handleLoadList({
      date: this.state.prevDate
    }).then(res => {
      let stories = this.state.stories
      stories.push(...res.stories)
      this.setState({
        stories,
        locked: false
      })
    }).catch(err => {
      console.log(err)
      this.setState({
        locked: false
      })
    })
  }

  handleLoadList({ date }) {
    const millionDate = date || Date.now()
    const _date = this.handleMillionsToDate(millionDate)
    return new Promise((resolve, reject) => {
      http.get(daily.news + '/' + _date).then(res => {
        this.setState({
          prevDate: millionDate - 86400000
        })
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  handleMillionsToDate(millions) {
    return new Date(millions).toJSON().split('T')[0].replace(/-/ig, '')
  }

  render() {
    return (
      <div className="App">
        <div className="warp">
          {
            this.state.stories.map((item, index) =>
              <Link to={{
                pathname: '/detail/' + item.id,
                query: {
                  id: item.id
                },
              }} key={index}>
                <Card img={item.images[0]} title={item.title} />
              </Link>
            )
          }
        </div>
      </div>
    )
  }
}
