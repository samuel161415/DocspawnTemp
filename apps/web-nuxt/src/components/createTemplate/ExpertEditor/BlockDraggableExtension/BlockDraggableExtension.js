// BlockDraggableExtension.js

import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'

let currentDragData = null // Declare the variable at the top

export const BlockDraggableExtension = Extension.create({
  name: 'blockDraggable',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('blockDraggable'),
        props: {
        //   decorations: (state) => {
        //     const { doc } = state
        //     const decorations = []

          //     doc.descendants((node, pos) => {
          //       if (node.isBlock && node.type.name !== 'doc') {
          //         // Add a node decoration for the block
          //         const nodeDecoration = Decoration.node(pos, pos + node.nodeSize, {
          //           class: 'block-draggable',
          //         })
          //         decorations.push(nodeDecoration)

          //         // Add a widget decoration for the icons container at position 'pos'
          //         const iconsDecoration = Decoration.widget(
          //           pos,
          //           () => {
          //             const container = document.createElement('div')
          //             container.className = 'block-icons-container'

          //             // Drag handle
          //             const dragHandle = document.createElement('div')
          //             dragHandle.className = 'drag-handle'
          //             dragHandle.innerHTML = '#'
          //             dragHandle.contentEditable = 'false' // Prevent focus
          //             dragHandle.draggable = true // Make it draggable
          //             dragHandle.dataset.pos = pos

          //             const handleDragStart = (event) => {
          //               console.log('drag starting')
          //               console.log('node.toJSON()', JSON.stringify(node.toJSON()))

          //               // Serialize the node and position into a single object
          //               currentDragData = {
          //                 node: node.toJSON(),
          //                 fromPos: pos,
          //               }

          //               event.dataTransfer.effectAllowed = 'move'
          //               event.dataTransfer.setDragImage(event.target, 0, 0)
          //             }

          //             dragHandle.addEventListener('dragstart', handleDragStart)

          //             // Add sibling button
          //             const addButton = document.createElement('div')
          //             addButton.className = 'add-sibling-button'
          //             addButton.innerHTML = '+'
          //             addButton.contentEditable = 'false' // Prevent focus
          //             addButton.dataset.pos = pos

          //             container.appendChild(dragHandle)
          //             container.appendChild(addButton)

          //             return container
          //           },
          //           { side: -1 },
          //         )
          //         decorations.push(iconsDecoration)
          //       }
          //     })

          //     return DecorationSet.create(doc, decorations)
          //   },
          decorations: (state) => {
            const { doc } = state
            const decorations = []

            doc.descendants((node, pos) => {
              if (node.isBlock && node.type.name !== 'doc') {
                // Add a node decoration for the block
                const nodeDecoration = Decoration.node(pos, pos + node.nodeSize, {
                  class: 'block-draggable',
                  style: 'position: relative; padding-left: 40px; display:flex;border:1px solid red;', // Add styles directly
                })
                decorations.push(nodeDecoration)

                // Add a widget decoration for the icons container at position 'pos'
                const iconsDecoration = Decoration.widget(
                  pos,
                  () => {
                    const container = document.createElement('div')
                    container.className = 'block-icons-container'
                    // Add inline styles to the container
                    // container.style.position = 'absolute'
                    container.style.float = 'left'
                    container.style.display = 'flex'
                    container.style.gap = '10px'
                    container.style.flexDirection = 'row'
                    container.style.border = '1px solid red'
                    // container.style.left = '0'
                    // container.style.top = '0'
                    // container.style.opacity = '0'
                    container.style.transition = 'opacity 0.2s'
                    container.style.pointerEvents = 'none' // So it doesn't block underlying events

                    // Drag handle
                    const dragHandle = document.createElement('div')
                    dragHandle.className = 'drag-handle'
                    dragHandle.innerHTML = '#'
                    dragHandle.contentEditable = 'false' // Prevent focus
                    dragHandle.draggable = true // Make it draggable
                    dragHandle.dataset.pos = pos

                    // Set pointer events to auto to allow interaction
                    dragHandle.style.pointerEvents = 'auto'

                    // Add styles to dragHandle

                    dragHandle.style.cursor = 'pointer'
                    dragHandle.style.userSelect = 'none'
                    dragHandle.style.width = '30px'
                    dragHandle.style.height = '30px'
                    dragHandle.style.lineHeight = '30px'
                    dragHandle.style.textAlign = 'center'
                    dragHandle.style.backgroundColor = '#f0f0f0'
                    dragHandle.style.marginBottom = '5px'
                    dragHandle.style.borderRadius = '3px'

                    // Add hover effect to dragHandle
                    dragHandle.addEventListener('mouseenter', () => {
                      dragHandle.style.backgroundColor = '#e0e0e0'
                    })
                    dragHandle.addEventListener('mouseleave', () => {
                      dragHandle.style.backgroundColor = '#f0f0f0'
                    })

                    const handleDragStart = (event) => {
                      console.log('drag starting')
                      console.log('node.toJSON()', JSON.stringify(node.toJSON()))

                      // Serialize the node and position into a single object
                      currentDragData = {
                        node: node.toJSON(),
                        fromPos: pos,
                      }

                      event.dataTransfer.effectAllowed = 'move'
                      event.dataTransfer.setDragImage(event.target, 0, 0)
                    }

                    dragHandle.addEventListener('dragstart', handleDragStart)

                    // Add sibling button
                    const addButton = document.createElement('div')
                    addButton.className = 'add-sibling-button'
                    addButton.innerHTML = '+'
                    addButton.contentEditable = 'false' // Prevent focus
                    addButton.dataset.pos = pos

                    // Set pointer events to auto to allow interaction
                    addButton.style.pointerEvents = 'auto'

                    // Add styles to addButton
                    addButton.style.cursor = 'pointer'
                    addButton.style.userSelect = 'none'
                    addButton.style.width = '30px'
                    addButton.style.height = '30px'
                    addButton.style.lineHeight = '30px'
                    addButton.style.textAlign = 'center'
                    addButton.style.backgroundColor = '#f0f0f0'
                    addButton.style.marginBottom = '5px'
                    addButton.style.borderRadius = '3px'

                    // Add hover effect to addButton
                    addButton.addEventListener('mouseenter', () => {
                      addButton.style.backgroundColor = '#e0e0e0'
                    })
                    addButton.addEventListener('mouseleave', () => {
                      addButton.style.backgroundColor = '#f0f0f0'
                    })
                    container.appendChild(addButton)
                    container.appendChild(dragHandle)

                    // Add event listeners to the parent block element to show/hide icons on hover
                    // setTimeout(() => {
                    //   const parentNode = container.parentNode
                    //   if (parentNode) {
                    //     parentNode.addEventListener('mouseenter', () => {
                    //       container.style.opacity = '1'
                    //     })
                    //     parentNode.addEventListener('mouseleave', () => {
                    //       container.style.opacity = '0'
                    //     })
                    //   }
                    // }, 0) // Delay to ensure parentNode is available

                    return container
                  },
                  { side: -1 },
                )
                decorations.push(iconsDecoration)
              }
            })

            return DecorationSet.create(doc, decorations)
          },

          handleClick(view, pos, event) {
            const target = event.target
            if (target.classList.contains('add-sibling-button')) {
              event.preventDefault()
              event.stopPropagation()

              const buttonPos = Number(target.dataset.pos)
              const { state, dispatch } = view
              const { schema } = state
              const nodeAtPos = state.doc.nodeAt(buttonPos)

              if (nodeAtPos) {
                const insertionPos = buttonPos + nodeAtPos.nodeSize
                const paragraphNode = schema.nodes.paragraph.create()

                const tr = state.tr.insert(insertionPos, paragraphNode)
                tr.setSelection(state.selection.constructor.near(tr.doc.resolve(insertionPos + 1)))
                dispatch(tr)
                view.focus()
                return true
              }
            }
            return false
          },

          handleDrop(view, event) {
            event.preventDefault()
            console.log('running handle drop')

            if (currentDragData) {
              const dragData = currentDragData
              currentDragData = null // Clear after use
              console.log('drag data', dragData)
              const { node: nodeJSON, fromPos } = dragData

              if (nodeJSON && !isNaN(fromPos)) {
                const { state, dispatch } = view
                const parsedNode = state.schema.nodeFromJSON(nodeJSON)
                console.log('parsed node', parsedNode)
                const dropPos = view.posAtCoords({ left: event.clientX, top: event.clientY })
                console.log('drop pos', dropPos)
                if (dropPos) {
                  let tr = state.tr.delete(fromPos, fromPos + parsedNode.nodeSize)
                  tr = tr.insert(dropPos.pos, parsedNode)
                  dispatch(tr)
                  return true
                }
              }
            }
            else {
              console.error('No drag data available')
            }

            return false
          },

          handleDOMEvents: {
            dragover: (view, event) => {
              event.preventDefault()
              return false
            },
          },
        },
      }),
    ]
  },
})

// import { Extension } from '@tiptap/core'
// import { Plugin, PluginKey } from 'prosemirror-state'
// import { Decoration, DecorationSet } from 'prosemirror-view'

// let currentDragData = null // Declare the variable at the top

// export const BlockDraggableExtension = Extension.create({
//   name: 'blockDraggable',

//   addProseMirrorPlugins() {
//     return [
//       new Plugin({
//         key: new PluginKey('blockDraggable'),
//         props: {
//           decorations: (state) => {
//             const { doc } = state
//             const decorations = []

//             doc.descendants((node, pos) => {
//               if (node.isBlock && node.type.name !== 'doc') {
//                 // Add a node decoration for the block
//                 const nodeDecoration = Decoration.node(pos, pos + node.nodeSize, {
//                   class: 'block-draggable',
//                 })
//                 decorations.push(nodeDecoration)

//                 // Add a widget decoration for the add-sibling button
//                 const addSiblingDecoration = Decoration.widget(
//                   pos + 1,
//                   () => {
//                     const button = document.createElement('div')
//                     button.className = 'add-sibling-button'
//                     button.innerHTML = '+'
//                     button.contentEditable = 'false' // Prevent focus
//                     button.dataset.pos = pos
//                     return button
//                   },
//                   { side: -1 },
//                 )
//                 decorations.push(addSiblingDecoration)

//                 // Add a widget decoration for the drag handle
//                 const dragHandleDecoration = Decoration.widget(
//                   pos + 1,
//                   () => {
//                     const dragHandle = document.createElement('div')
//                     dragHandle.className = 'drag-handle'
//                     dragHandle.innerHTML = '#'
//                     dragHandle.contentEditable = 'false' // Prevent focus
//                     dragHandle.draggable = true // Make it draggable
//                     dragHandle.dataset.pos = pos

//                     const handleDragStart = (event) => {
//                       console.log('drag starting')
//                       console.log('node.toJSON()', JSON.stringify(node.toJSON()))

//                       // Serialize the node and position into a single object
//                       currentDragData = {
//                         node: node.toJSON(),
//                         fromPos: pos,
//                       }

//                       event.dataTransfer.effectAllowed = 'move'
//                       event.dataTransfer.setDragImage(event.target, 0, 0)
//                     }

//                     dragHandle.addEventListener('dragstart', handleDragStart)

//                     return dragHandle
//                   },
//                   { side: -1 },
//                 )
//                 decorations.push(dragHandleDecoration)
//               }
//             })

//             return DecorationSet.create(doc, decorations)
//           },

//           handleClick(view, pos, event) {
//             const target = event.target
//             if (target.classList.contains('add-sibling-button')) {
//               event.preventDefault()
//               event.stopPropagation()

//               const buttonPos = Number(target.dataset.pos)
//               const { state, dispatch } = view
//               const { schema } = state
//               const nodeAtPos = state.doc.nodeAt(buttonPos)

//               if (nodeAtPos) {
//                 const insertionPos = buttonPos + nodeAtPos.nodeSize
//                 const paragraphNode = schema.nodes.paragraph.create()

//                 const tr = state.tr.insert(insertionPos, paragraphNode)
//                 tr.setSelection(state.selection.constructor.near(tr.doc.resolve(insertionPos + 1)))
//                 dispatch(tr)
//                 view.focus()
//                 return true
//               }
//             }
//             return false
//           },

//           handleDrop(view, event) {
//             event.preventDefault()
//             console.log('running handle drop')

//             if (currentDragData) {
//               const dragData = currentDragData
//               currentDragData = null // Clear after use
//               console.log('drag data', dragData)
//               const { node: nodeJSON, fromPos } = dragData

//               if (nodeJSON && !isNaN(fromPos)) {
//                 const { state, dispatch } = view
//                 const parsedNode = state.schema.nodeFromJSON(nodeJSON)
//                 console.log('parsed node', parsedNode)
//                 const dropPos = view.posAtCoords({ left: event.clientX, top: event.clientY })
//                 console.log('drop pos', dropPos)
//                 if (dropPos) {
//                   let tr = state.tr.delete(fromPos, fromPos + parsedNode.nodeSize)
//                   tr = tr.insert(dropPos.pos, parsedNode)
//                   dispatch(tr)
//                   return true
//                 }
//               }
//             }
//             else {
//               console.error('No drag data available')
//             }

//             return false
//           },

//           handleDOMEvents: {
//             dragover: (view, event) => {
//               event.preventDefault()
//               return false
//             },
//           },
//         },
//       }),
//     ]
//   },
// })
