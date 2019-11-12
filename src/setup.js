// TODO do shadow dom elements
import $ from "jquery"

export default function () {
  $(window).on('load', function () {
    // special monoscape attributes
    $('plaintext:first').text(document.documentElement.outerHTML.split('<plaintext>').pop())
    $('listing').each(function () {
      $(this).text($(this).html())
    })
    
    // font control attributes
    $('font').each(function () {
      $(this).css('color', $(this).attr('color'))
      $(this).css('font-size', $(this).attr('size'))
      $(this).css('font-family', $(this).attr('face'))
    })
    $('basefont').each(function () {
      $('body').css('color', $(this).attr('color'))
      $('body').css('font-size', $(this).attr('size'))
      $('body').css('font-family', $(this).attr('face'))
    })
    
    // <marquee> attributes
    $('marquee').each(function () {
      // embed span between marquee and content
      $(this).html(`<span class="webcpr-marquee">${$(this).html()}</span>`)
      
      // edit simple stuff
      $(this).css('background-color', $(this).attr('bgcolor'))
      $(this).css('height', $(this).attr('height'))
      $(this).css('width', $(this).attr('width'))
      $(this).css('margin', `${$(this).attr('vspace')} ${$(this).attr('hspace')}`)
      
      // edit animation length
      if ($(this).attr('direction') == 'up' || $(this).attr('direction') == 'down') {
        $(this).css('animation-duration', `${($(this).find('.webcpr-marquee').height()/18)*0.5}s`)
      } else {
        $(this).find('.webcpr-marquee').css('animation-duration', `${($(this).find('.webcpr-marquee').width()/1424)*20.6}s`)
      }
      $(this).find('.webcpr-marquee').css('animation-iteration-count', $(this).attr('loop'))
      
      // edit animation behavior
      if ($(this).attr('behavior') == 'alternate') {
        let altType = $(this).css('animation-direction') == 'reverse' ? 'alternate-reverse' : 'alternate'
        $(this).find('.webcpr-marquee').css('animation-direction', altType)
      } else if ($(this).attr('behavior') == 'slide') {
        $(this).find('.webcpr-marquee').css('animation-iteration-count', 1)
      }
    })

    // aliases
    $('image').each(function () {
      let n = $('<img>', { html: $(this).html() })
  		$.each(this.attributes, function () {
  			n.attr(this.name, this.value)
  		})
  		$(this).replaceWith(n)
    })
    $('bgsound').each(function () {
      $(this).replaceWith(`<audio volume="${(Number($(this).attr('volume'))+10000)/10000}" autoplay ${$(this).attr('loop') == 'infinite' ? 'loop' : ''} hidden><source src=${$(this).attr('src')}></audio>`)
    })
    $('frame').each(function () {
      $(this).replaceWith(`<iframe src="${$(this).attr('src')}" id="${$(this).attr('name')}" style="margin: ${$(this).attr('marginheight')} ${$(this).attr('marginwidth')};"></iframe>`)
    })
    $('multicol').each(function () {
      let n = $('<div>', { html: $(this).html() })
  		$.each(this.attributes, function () {
  			n.attr(this.name, this.value)
  		})
  		$(this).replaceWith(n)
    })
    
    // <noembed> and <noframes>
    $('noembed').each(function () {
      let testEmbed = document.createElement('embed')
      let check = Object.prototype.toString.call(testEmbed) !== '[object HTMLUnknownElement]'
      if (check) $(this).hide()
    })
    $('noframes').each(function () {
      let testFrame = document.createElement('frame')
      let check = Object.prototype.toString.call(testFrame) !== '[object HTMLUnknownElement]'
      if (check) $(this).hide()
    })
    
    // <frameset> things
    $('frameset').each(function () {
      let widths = $(this).attr('cols').split(',')
      let heights = $(this).attr('rows').split(',')
      let wpos = 0
      let hpos = 0
      $(this).children('frame').each(function () {
        $(this).css('width', widths[pos])
        $(this).css('height', heights[pos])
        wpos++
        if (wpos == widths.length) {
          wpos = 0
          hpos++
        }
      })
    })
    
    // <spacer> things
    $('spacer').each(function () {
      if ($(this).attr('type') == 'horizontal') $(this).css('width', $(this).attr('size'))
      else if ($(this).attr('type') == 'vertical') $(this).css('height', $(this).attr('size'))
      else if ($(this).attr('type') == 'block') {
        $(this).css('width', $(this).attr('width'))
        $(this).css('height', $(this).attr('height'))
      }
      $(this).css('text-align', $(this).attr('align'))
    })
    
    // shadow dom elements
    $('content, shadow').each(function () {
      let curr = ''
      for (let i of $(this).attr('select').split(',')) {
        $(i).each(function () {
          curr = $(this).html()
        })
        $(this).html($(this).html() + curr)
      }
    })
  })
}
