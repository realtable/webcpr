import $ from "jquery"

export default function () {
  $(window).on('load', function () {
    // special monoscape attributes
    $('plaintext:first').text(document.documentElement.outerHTML.split('<plaintext>').pop())
    $('listing').each(function() {
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
        var altType = $(this).css('animation-direction') == 'reverse' ? 'alternate-reverse' : 'alternate'
        $(this).find('.webcpr-marquee').css('animation-direction', altType)
      } else if ($(this).attr('behavior') == 'slide') {
        $(this).find('.webcpr-marquee').css('animation-iteration-count', 1)
      }
    })

    // aliases
    $('image').each(function () {
      $(this).replaceWith('<img>' + $(this).html() +'</img>')
    })
  })
}