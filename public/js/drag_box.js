var dragBox = null
var dragHandler = null
var prevX = 0
var prevY = 0
document.documentElement.addEventListener('mousedown', function (event) {
  dragBox = event.target.closest('[drag-box]')
  dragHandler = event.target.closest('[drag-handler]')
  var dragHandlerCls = dragHandler && dragHandler.getAttribute('drag-handler')
  if (dragHandlerCls) {
    dragHandler = event.target.closest(dragHandlerCls)
  }
  if (dragBox) {
    Object.assign(dragBox.style, {
      'z-index': ++window.Zindex
    })
  }
  if (dragBox && dragHandler) {
    var { x, y } = event
    prevX = x
    prevY = y
    Object.assign(document.documentElement.style, {
      'user-select': 'none'
    })
  }
})
document.documentElement.addEventListener('mousemove', function (event) {
  if (dragBox && dragHandler) {
    var { top, left, width } = dragBox.getBoundingClientRect()
    var { x, y } = event
    left = left + (x - prevX)
    top = top + (y - prevY)
    left = Math.min(left, document.documentElement.offsetWidth - 100)
    top = Math.min(top, document.documentElement.offsetHeight - 100)
    left = Math.max(left, 100 - width)
    top = Math.max(top, 0)
    Object.assign(dragBox.style, {
      left: left + 'px',
      top: top + 'px',
      right: 'unset',
      bottom: 'unset'
    })
    prevX = x
    prevY = y
  }
})
document.documentElement.addEventListener('mouseup', function (event) {
  dragBox = null
  dragHandler = null
  prevX = 0
  prevY = 0
  Object.assign(document.documentElement.style, {
    'user-select': 'unset'
  })
})
