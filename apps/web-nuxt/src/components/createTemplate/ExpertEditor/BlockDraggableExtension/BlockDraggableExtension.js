// BlockDraggableExtension.js

import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'

export const BlockDraggableExtension = Extension.create({
  name: 'blockDraggable',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('blockDraggable'),
        props: {
          decorations: (state) => {
            const { doc } = state
            const decorations = []

            doc.descendants((node, pos) => {
              if (node.isBlock && node.type.name !== 'doc') {
                // Add a node decoration for the block
                const nodeDecoration = Decoration.node(pos, pos + node.nodeSize, {
                  class: 'block-draggable',
                })
                decorations.push(nodeDecoration)

                // Add a widget decoration for the add-sibling button
                const addSiblingDecoration = Decoration.widget(pos + 1, () => {
                  const button = document.createElement('div')
                  button.className = 'add-sibling-button'
                  button.innerHTML = '+'
                  button.contentEditable = 'false' // Prevent focus
                  button.dataset.pos = pos
                  return button
                }, { side: -1 })
                decorations.push(addSiblingDecoration)

                // Add a widget decoration for the drag handle
                const dragHandleDecoration = Decoration.widget(pos + 1, () => {
                  const dragHandle = document.createElement('div')
                  dragHandle.className = 'drag-handle'
                  dragHandle.innerHTML = '#'
                  dragHandle.contentEditable = 'false' // Prevent focus
                  dragHandle.draggable = true // Make it draggable
                  dragHandle.dataset.pos = pos

                  // Define handleDragStart inside the closure
                  //   const handleDragStart = (event) => {
                  //     event.dataTransfer.setData('application/x-prosemirror-node', JSON.stringify(node.toJSON()))
                  //     event.dataTransfer.setData('text/plain', pos.toString())
                  //     event.dataTransfer.effectAllowed = 'move'
                  //     event.dataTransfer.setDragImage(event.target, 0, 0)
                  //   }
                  const handleDragStart = (event) => {
                    const dragData = {
                      node: node.toJSON(),
                      fromPos: pos,
                    }
                    event.dataTransfer.setData('text/plain', JSON.stringify(dragData))
                    event.dataTransfer.effectAllowed = 'move'
                    event.dataTransfer.setDragImage(event.target, 0, 0)
                  }

                  dragHandle.addEventListener('dragstart', handleDragStart)

                  return dragHandle
                }, { side: -1 })
                decorations.push(dragHandleDecoration)
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
              const insertionPos = buttonPos + view.state.doc.nodeAt(buttonPos).nodeSize
              const paragraphNode = schema.nodes.paragraph.create()

              const tr = state.tr.insert(insertionPos, paragraphNode)
              tr.setSelection(state.selection.constructor.near(tr.doc.resolve(insertionPos + 1)))
              dispatch(tr)
              view.focus()
              return true
            }
            return false
          },

          handleDrop(view, event) {
            event.preventDefault()
            console.log('running handle drop')
            const data = event.dataTransfer.getData('application/x-prosemirror-node')
            console.log('event.dataTransfer.getData(application/x-prosemirror-node)', event.dataTransfer.getData('application/x-prosemirror-node'))
            const fromPos = Number(event.dataTransfer.getData('text/plain'))
            console.log('data && !isNaN(fromPos)', data && !isNaN(fromPos) ? 'true' : 'false')
            console.log('data', data)
            console.log('!isNaN(fromPos)', !isNaN(fromPos))
            if (data && !isNaN(fromPos)) {
              const { state, dispatch } = view
              const parsedNode = state.schema.nodeFromJSON(JSON.parse(data))
              const dropPos = view.posAtCoords({ left: event.clientX, top: event.clientY })
              if (dropPos) {
                let tr = state.tr.delete(fromPos, fromPos + parsedNode.nodeSize)
                tr = tr.insert(dropPos.pos, parsedNode)
                dispatch(tr)
                return true
              }
            }
            return false
          },
        },
      }),
    ]
  },
})

// import { Extension } from '@tiptap/core'
// import { EditorState, Plugin, PluginKey } from 'prosemirror-state'
// import { Decoration, DecorationSet } from 'prosemirror-view'

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
//                 // Add a node decoration for the draggable block
//                 const nodeDecoration = Decoration.node(pos, pos + node.nodeSize, {
//                   class: 'block-draggable',
//                 })
//                 decorations.push(nodeDecoration)

//                 // Add a widget decoration for the add-sibling button
//                 const addSiblingDecoration = Decoration.widget(pos + 1, () => {
//                   const button = document.createElement('div')
//                   button.className = 'add-sibling-button'
//                   button.innerHTML = '+'
//                   button.contentEditable = 'false' // Prevent focus
//                   // Store the position in the button's dataset
//                   button.dataset.pos = pos
//                   return button
//                 }, { side: -1 })
//                 decorations.push(addSiblingDecoration)
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
//               const insertionPos = buttonPos + view.state.doc.nodeAt(buttonPos).nodeSize
//               const paragraphNode = schema.nodes.paragraph.create()

//               const tr = state.tr.insert(insertionPos, paragraphNode)
//               tr.setSelection(state.selection.constructor.near(tr.doc.resolve(insertionPos + 1)))
//               dispatch(tr)
//               view.focus()
//               return true
//             }
//             return false
//           },
//           handleDOMEvents: {
//             dragstart(view, event) {
//               const { state } = view
//               const target = event.target.closest('.block-draggable')
//               if (target) {
//                 const pos = view.posAtDOM(target)
//                 const node = state.doc.nodeAt(pos)
//                 if (node) {
//                   event.dataTransfer.setData('application/x-prosemirror-node', JSON.stringify(node.toJSON()))
//                   event.dataTransfer.effectAllowed = 'move'
//                   view.dragging = { node, from: pos, to: pos + node.nodeSize }
//                   return true
//                 }
//               }
//               return false
//             },
//             drop(view, event) {
//               const data = event.dataTransfer.getData('application/x-prosemirror-node')
//               if (data) {
//                 const { state, dispatch } = view
//                 const parsedNode = state.schema.nodeFromJSON(JSON.parse(data))
//                 const dropPos = view.posAtCoords({ left: event.clientX, top: event.clientY })
//                 if (dropPos) {
//                   const tr = state.tr.deleteSelection().insert(dropPos.pos, parsedNode)
//                   dispatch(tr)
//                   event.preventDefault()
//                   return true
//                 }
//               }
//               return false
//             },
//           },

//         },
//       }),
//     ]
//   },
// })
