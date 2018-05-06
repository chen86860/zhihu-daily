import './card.css'
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { daily } from './../../service'

export default class Card extends Component {
  constructor(props) {
    super(props)
    this.imgSrcFilter = this.imgSrcFilter.bind(this)
  }
  handleClick(title, event) {
    // this.props.handleTitleClick(title)
  }

  imgSrcFilter(src) {
    // https://pic1.zhimg.com/v2-b02297
    let path = src.match(/https?:\/\/(.*)/i) ? src.match(/https?:\/\/(.*)/i)[1] : ''
    return path ? daily.img + '/' + path : src
  }

  render() {
    const imgSrc = this.imgSrcFilter(this.props.img || 'http://img.alicdn.com/imgextra/i1/1710396780/TB2yA5Ccv6TBKNjSZJiXXbKVFXa_!!1710396780.jpg_600x600q50_.webp')
    const title = this.props.title || 'no title'
    return (
      <div className='card'>
        <p>{title}</p>
        <img src={imgSrc} alt={title} />
      </div>
    )
  }
}

Card.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}