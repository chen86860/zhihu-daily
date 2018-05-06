import http from '@/base/http'
import { daily } from '@/service'
import React, { Component } from 'react'
import './Detail.scss'

export default class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: '',
      id: '',
      detailHTML: '',
      headerImg: '',
    }
    this.htmlFilter = this.htmlFilter.bind(this)
  }

  componentDidMount() {
    let query = this.props.match.params || this.props.location.query || {}
    this.setState({
      id: query.id,
    })
    query.id && http.get(daily.detail + '/' + query.id).then(res => {
      this.setState({
        detailHTML: this.htmlFilter(res.body),
        headerImg: res.image
      })
    })
  }
  componentWillUpdate(prevProps, prevState) {
    console.log(document.querySelector('.img-place-holder'))
  }

  componentDidUpdate(nextProps, nextState) {
    console.log(document.querySelector('.img-place-holder'))
  }

  htmlFilter(html) {
    return html.replace(/https?:\/\/(.*?\.zhimg.com\/.*?)"/ig, `${daily.img}/$1"`)
  }

  render() {
    if (!this.state.id) {
      return (
        <div>
          Params ID not Present!!!
        </div>
      )
    }
    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: this.state.detailHTML }}></div>
      </div >
    )
  }
}
