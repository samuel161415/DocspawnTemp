import { VueRenderer } from '@tiptap/vue-3'
import tippy from 'tippy.js'
import CommandsList from './CommandsList.vue'

export default {
  items: ({ query }) => {
    const formatItems = [
      {
        title: 'Bold',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleBold().run()
        },
      },
      {
        title: 'Italic',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleItalic().run()
        },
      },
      {
        title: 'Strike',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleStrike().run()
        },
      },
      {
        title: 'Code',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleCode().run()
        },
      },
      {
        title: 'Paragraph',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setParagraph().run()
        },
      },
      {
        title: 'Heading 1',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleHeading({ level: 1 }).run()
        },
      },
      {
        title: 'Heading 2',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleHeading({ level: 2 }).run()
        },
      },
      {
        title: 'Heading 3',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleHeading({ level: 3 }).run()
        },
      },
      {
        title: 'Heading 4',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleHeading({ level: 4 }).run()
        },
      },
      {
        title: 'Heading 5',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleHeading({ level: 5 }).run()
        },
      },
      {
        title: 'Heading 6',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleHeading({ level: 6 }).run()
        },
      },
      {
        title: 'Bullet List',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleBulletList().run()
        },
      },
      {
        title: 'Ordered List',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleOrderedList().run()
        },
      },
      {
        title: 'Blockquote',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleBlockquote().run()
        },
      },
      {
        title: 'Code Block',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleCodeBlock().run()
        },
      },
      {
        title: 'Horizontal Rule',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setHorizontalRule().run()
        },
      },
      {
        title: 'Hard Break',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setHardBreak().run()
        },
      },
      {
        title: 'Clear Marks',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).unsetAllMarks().run()
        },
      },
      {
        title: 'Clear Nodes',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).clearNodes().run()
        },
      },
    ]

    const insertItems = [
      {
        title: 'Table',
        // command: ({ editor, range }) => {
        //   editor.chain().focus().deleteRange(range).insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
        // },
        command: ({ editor, range }) => {
          editor.chain().focus()
            .deleteRange(range) // Delete the selected range if there's any
            .insertContentAt(editor.state.selection.anchor, {
              type: 'paragraph',
              content: [],
            })
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true }) // Insert an empty paragraph before the table
            // .insertContentAt(editor.state.selection.anchor + 1, {
            //   type: 'table',
            //   attrs: { rows: 3, cols: 3, withHeaderRow: true },
            // }) // Insert the table right after the paragraph
            .run()
        },
      },
      {
        title: 'Delete Table',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).deleteTable().run()
        },
      },
      {
        title: 'Add Column Before',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).addColumnBefore().run()
        },
      },
      {
        title: 'Add Column After',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).addColumnAfter().run()
        },
      },
      {
        title: 'Delete Column',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).deleteColumn().run()
        },
      },
      {
        title: 'Add Row Before',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).addRowBefore().run()
        },
      },
      {
        title: 'Add Row After',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).addRowAfter().run()
        },
      },
      {
        title: 'Delete Row',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).deleteRow().run()
        },
      },
      {
        title: 'Merge Cells',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).mergeCells().run()
        },
      },
      {
        title: 'Split Cell',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).splitCell().run()
        },
      },
      {
        title: 'Toggle Header Column',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleHeaderColumn().run()
        },
      },
      {
        title: 'Toggle Header Row',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleHeaderRow().run()
        },
      },
      {
        title: 'Toggle Header Cell',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleHeaderCell().run()
        },
      },
      {
        title: 'Image',
        command: ({ editor, range }) => {
          const url = prompt('Enter the image URL')
          if (url)
            editor.chain().focus().deleteRange(range).setImage({ src: url }).run()
        },
      },
      {
        title: 'Undo',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).undo().run()
        },
      },
      {
        title: 'Redo',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).redo().run()
        },
      },
    ]

    const filterItems = (items) => {
      return items.filter(item => item.title.toLowerCase().includes(query.toLowerCase()))
    }

    return {
      format: filterItems(formatItems),
      insert: filterItems(insertItems),
    }
  },

  render: () => {
    let component
    let popup

    return {
      onStart: (props) => {
        component = new VueRenderer(CommandsList, {
          props,
          editor: props.editor,
        })

        if (!props.clientRect)
          return

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        })
      },

      onUpdate(props) {
        component.updateProps(props)

        if (!props.clientRect)
          return

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        })
      },

      onKeyDown(props) {
        if (props.event.key === 'Escape') {
          popup[0].hide()
          return true
        }

        return component.ref?.onKeyDown(props)
      },

      onExit() {
        popup[0].destroy()
        component.destroy()
      },
    }
  },
}

// import { VueRenderer } from '@tiptap/vue-3'
// import tippy from 'tippy.js'

// import CommandsList from './CommandsList.vue'

// export default {
//   items: ({ query }) => {
//     return [
//       {
//         title: 'Heading 1',
//         command: ({ editor, range }) => {
//           editor
//             .chain()
//             .focus()
//             .deleteRange(range)
//             .setNode('heading', { level: 1 })
//             .run()
//         },
//       },
//       {
//         title: 'Heading 2',
//         command: ({ editor, range }) => {
//           editor
//             .chain()
//             .focus()
//             .deleteRange(range)
//             .setNode('heading', { level: 2 })
//             .run()
//         },
//       },
//       {
//         title: 'Bold',
//         command: ({ editor, range }) => {
//           editor
//             .chain()
//             .focus()
//             .deleteRange(range)
//             .setMark('bold')
//             .run()
//         },
//       },
//       {
//         title: 'Italic',
//         command: ({ editor, range }) => {
//           editor
//             .chain()
//             .focus()
//             .deleteRange(range)
//             .setMark('italic')
//             .run()
//         },
//       },
//     ].filter(item => item.title.toLowerCase().startsWith(query.toLowerCase())).slice(0, 10)
//   },

//   render: () => {
//     let component
//     let popup

//     return {
//       onStart: (props) => {
//         component = new VueRenderer(CommandsList, {
//           // using vue 2:
//           // parent: this,
//           // propsData: props,
//           props,
//           editor: props.editor,
//         })

//         if (!props.clientRect)
//           return

//         popup = tippy('body', {
//           getReferenceClientRect: props.clientRect,
//           appendTo: () => document.body,
//           content: component.element,
//           showOnCreate: true,
//           interactive: true,
//           trigger: 'manual',
//           placement: 'bottom-start',
//         })
//       },

//       onUpdate(props) {
//         component.updateProps(props)

//         if (!props.clientRect)
//           return

//         popup[0].setProps({
//           getReferenceClientRect: props.clientRect,
//         })
//       },

//       onKeyDown(props) {
//         if (props.event.key === 'Escape') {
//           popup[0].hide()

//           return true
//         }

//         return component.ref?.onKeyDown(props)
//       },

//       onExit() {
//         popup[0].destroy()
//         component.destroy()
//       },
//     }
//   },
// }

/** */
// import { VueRenderer } from '@tiptap/vue-3'
// import tippy from 'tippy.js'
// import CommandsList from './CommandsList.vue'

// export default {
//   items: ({ query }) => {
//     const formatItems = [
//       {
//         title: 'Bold',
//         command: ({ editor, range }) => {
//           editor.chain()
//             .focus()
//             .deleteRange(range)
//             .toggleBold()
//             .insertContent('Bold Text')
//             .run()
//         },
//       },
//       {
//         title: 'Italic',
//         command: ({ editor, range }) => {
//           editor.chain()
//             .focus()
//             .deleteRange(range)
//             .toggleItalic()
//             .insertContent('Italic Text')
//             .run()
//         },
//       },
//       {
//         title: 'Strike',
//         command: ({ editor, range }) => {
//           editor.chain()
//             .focus()
//             .deleteRange(range)
//             .toggleStrike()
//             .insertContent('Strike Text')
//             .run()
//         },
//       },
//       {
//         title: 'Code',
//         command: ({ editor, range }) => {
//           editor.chain()
//             .focus()
//             .deleteRange(range)
//             .toggleCode()
//             .insertContent('Code Text')
//             .run()
//         },
//       },
//       {
//         // title: 'Paragraph',
//         // command: ({ editor, range }) => {
//         //   editor.chain().focus().deleteRange(range).setParagraph().run()
//         // },
//         // normally it removing the draggable item div, if there is empty div, so we have to check and mantain
//         title: 'Paragraph',
//         command: ({ editor, range }) => {
//           const { state } = editor.view

//           // Check if the current selection is already inside a draggableItem
//           const $pos = state.selection.$from
//           const isInsideDraggableItem = $pos.node(-1).type.name === 'draggableItem'

//           // First delete the selected range where the slash command was triggered
//           editor.chain().focus().deleteRange(range).run()

//           // Get the current node after the range is deleted
//           const resolvedPos = state.doc.resolve(editor.state.selection.anchor)
//           const currentNode = resolvedPos.nodeAfter || resolvedPos.nodeBefore

//           // Safely check if it's an empty paragraph
//           const isEmptyParagraph = currentNode && currentNode.type.name === 'paragraph' && currentNode.textContent === ''

//           if (isInsideDraggableItem && !isEmptyParagraph && currentNode.text !== '/') {
//             // If already inside a draggableItem and no empty paragraph, insert a new paragraph
//             editor.chain().focus()
//               .insertContentAt(state.selection.anchor, {
//                 type: 'paragraph',
//                 content: ['jkbskja'],
//               })
//               .run()
//           }
//           else {
//             editor.chain().focus().insertContent('Paragraph').run()
//           }
//           // Else, do nothing since we already have an empty paragraph
//         },

//       },
//       {
//         title: 'Heading 1',
//         command: ({ editor, range }) => {
//           editor.chain()
//             .focus()
//             .deleteRange(range)
//             .toggleHeading({ level: 1 })
//             .insertContent('Heading 1')
//             .run()
//         },
//       },
//       {
//         title: 'Heading 2',
//         command: ({ editor, range }) => {
//           editor.chain()
//             .focus()
//             .deleteRange(range)
//             .toggleHeading({ level: 2 })
//             .insertContent('Heading 2')
//             .run()
//         },
//       },
//       {
//         title: 'Heading 3',
//         command: ({ editor, range }) => {
//           editor.chain()
//             .focus()
//             .deleteRange(range)
//             .toggleHeading({ level: 3 })
//             .insertContent('Heading 3')
//             .run()
//         },
//       },
//       {
//         title: 'Heading 4',
//         command: ({ editor, range }) => {
//           editor.chain()
//             .focus()
//             .deleteRange(range)
//             .toggleHeading({ level: 4 })
//             .insertContent('Heading 4')
//             .run()
//         },
//       },
//       {
//         title: 'Heading 5',
//         command: ({ editor, range }) => {
//           editor.chain()
//             .focus()
//             .deleteRange(range)
//             .toggleHeading({ level: 5 })
//             .insertContent('Heading 5')
//             .run()
//         },
//       },
//       {
//         title: 'Heading 6',
//         command: ({ editor, range }) => {
//           editor.chain()
//             .focus()
//             .deleteRange(range)
//             .toggleHeading({ level: 6 })
//             .insertContent('Heading 6')
//             .run()
//         },
//       },
//       {
//         title: 'Bullet List',
//         command: ({ editor, range }) => {
//           editor.chain()
//             .focus()
//             .deleteRange(range)
//             .toggleBulletList()
//             .insertContent('Bullet List Item')
//             .run()
//         },
//       },
//       {
//         title: 'Ordered List',
//         command: ({ editor, range }) => {
//           editor.chain()
//             .focus()
//             .deleteRange(range)
//             .toggleOrderedList()
//             .insertContent('Ordered List Item')
//             .run()
//         },
//       },
//       {
//         title: 'Blockquote',
//         command: ({ editor, range }) => {
//           editor.chain()
//             .focus()
//             .deleteRange(range)
//             .toggleBlockquote()
//             .insertContent('Blockquote Text')
//             .run()
//         },
//       },
//       {
//         title: 'Code Block',
//         command: ({ editor, range }) => {
//           editor.chain()
//             .focus()
//             .deleteRange(range)
//             .toggleCodeBlock()
//             .insertContent('Code Block')
//             .run()
//         },
//       },
//       {
//         title: 'Horizontal Rule',
//         command: ({ editor, range }) => {
//           editor.chain()
//             .focus()
//             .deleteRange(range)
//             .setHorizontalRule()
//             .run()
//         },
//       },
//       {
//         title: 'Hard Break',
//         command: ({ editor, range }) => {
//           editor.chain()
//             .focus()
//             .deleteRange(range)
//             .setHardBreak()
//             .run()
//         },
//       },
//       {
//         title: 'Clear Marks',
//         command: ({ editor, range }) => {
//           editor.chain()
//             .focus()
//             .deleteRange(range)
//             .unsetAllMarks()
//             .run()
//         },
//       },
//       {
//         title: 'Clear Nodes',
//         command: ({ editor, range }) => {
//           editor.chain()
//             .focus()
//             .deleteRange(range)
//             .clearNodes()
//             .run()
//         },
//       },

//     ]

//     const insertItems = [
//       {
//         title: 'Table',
//         // command: ({ editor, range }) => {
//         //   editor.chain().focus().deleteRange(range).insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
//         // },
//         command: ({ editor, range }) => {
//           editor.chain().focus()
//             .deleteRange(range) // Delete the selected range if there's any
//             .insertContentAt(editor.state.selection.anchor, {
//               type: 'paragraph',
//               content: [],
//             })
//             .insertTable({ rows: 3, cols: 3, withHeaderRow: true }) // Insert an empty paragraph before the table
//             // .insertContentAt(editor.state.selection.anchor + 1, {
//             //   type: 'table',
//             //   attrs: { rows: 3, cols: 3, withHeaderRow: true },
//             // }) // Insert the table right after the paragraph
//             .run()
//         },
//       },
//       {
//         title: 'Delete Table',
//         command: ({ editor, range }) => {
//           editor.chain().focus().deleteRange(range).deleteTable().run()
//         },
//       },
//       {
//         title: 'Add Column Before',
//         command: ({ editor, range }) => {
//           editor.chain().focus().deleteRange(range).addColumnBefore().run()
//         },
//       },
//       {
//         title: 'Add Column After',
//         command: ({ editor, range }) => {
//           editor.chain().focus().deleteRange(range).addColumnAfter().run()
//         },
//       },
//       {
//         title: 'Delete Column',
//         command: ({ editor, range }) => {
//           editor.chain().focus().deleteRange(range).deleteColumn().run()
//         },
//       },
//       {
//         title: 'Add Row Before',
//         command: ({ editor, range }) => {
//           editor.chain().focus().deleteRange(range).addRowBefore().run()
//         },
//       },
//       {
//         title: 'Add Row After',
//         command: ({ editor, range }) => {
//           editor.chain().focus().deleteRange(range).addRowAfter().run()
//         },
//       },
//       {
//         title: 'Delete Row',
//         command: ({ editor, range }) => {
//           editor.chain().focus().deleteRange(range).deleteRow().run()
//         },
//       },
//       {
//         title: 'Merge Cells',
//         command: ({ editor, range }) => {
//           editor.chain().focus().deleteRange(range).mergeCells().run()
//         },
//       },
//       {
//         title: 'Split Cell',
//         command: ({ editor, range }) => {
//           editor.chain().focus().deleteRange(range).splitCell().run()
//         },
//       },
//       {
//         title: 'Toggle Header Column',
//         command: ({ editor, range }) => {
//           editor.chain().focus().deleteRange(range).toggleHeaderColumn().run()
//         },
//       },
//       {
//         title: 'Toggle Header Row',
//         command: ({ editor, range }) => {
//           editor.chain().focus().deleteRange(range).toggleHeaderRow().run()
//         },
//       },
//       {
//         title: 'Toggle Header Cell',
//         command: ({ editor, range }) => {
//           editor.chain().focus().deleteRange(range).toggleHeaderCell().run()
//         },
//       },
//       {
//         title: 'Image',
//         command: ({ editor, range }) => {
//           const url = prompt('Enter the image URL')
//           if (url)
//             editor.chain().focus().deleteRange(range).setImage({ src: url }).run()
//         },
//       },
//       {
//         title: 'Undo',
//         command: ({ editor, range }) => {
//           editor.chain().focus().deleteRange(range).undo().run()
//         },
//       },
//       {
//         title: 'Redo',
//         command: ({ editor, range }) => {
//           editor.chain().focus().deleteRange(range).redo().run()
//         },
//       },
//     ]

//     const filterItems = (items) => {
//       return items.filter(item => item.title.toLowerCase().includes(query.toLowerCase()))
//     }

//     return {
//       format: filterItems(formatItems),
//       insert: filterItems(insertItems),
//     }
//   },

//   render: () => {
//     let component
//     let popup

//     return {
//       onStart: (props) => {
//         component = new VueRenderer(CommandsList, {
//           props,
//           editor: props.editor,
//         })

//         if (!props.clientRect)
//           return

//         popup = tippy('body', {
//           getReferenceClientRect: props.clientRect,
//           appendTo: () => document.body,
//           content: component.element,
//           showOnCreate: true,
//           interactive: true,
//           trigger: 'manual',
//           placement: 'bottom-start',
//         })
//       },

//       onUpdate(props) {
//         component.updateProps(props)

//         if (!props.clientRect)
//           return

//         popup[0].setProps({
//           getReferenceClientRect: props.clientRect,
//         })
//       },

//       onKeyDown(props) {
//         if (props.event.key === 'Escape') {
//           popup[0].hide()
//           return true
//         }

//         return component.ref?.onKeyDown(props)
//       },

//       onExit() {
//         popup[0].destroy()
//         component.destroy()
//       },
//     }
//   },
// }

// import { VueRenderer } from '@tiptap/vue-3'
// import tippy from 'tippy.js'

// import CommandsList from './CommandsList.vue'

// export default {
//   items: ({ query }) => {
//     return [
//       {
//         title: 'Heading 1',
//         command: ({ editor, range }) => {
//           editor
//             .chain()
//             .focus()
//             .deleteRange(range)
//             .setNode('heading', { level: 1 })
//             .run()
//         },
//       },
//       {
//         title: 'Heading 2',
//         command: ({ editor, range }) => {
//           editor
//             .chain()
//             .focus()
//             .deleteRange(range)
//             .setNode('heading', { level: 2 })
//             .run()
//         },
//       },
//       {
//         title: 'Bold',
//         command: ({ editor, range }) => {
//           editor
//             .chain()
//             .focus()
//             .deleteRange(range)
//             .setMark('bold')
//             .run()
//         },
//       },
//       {
//         title: 'Italic',
//         command: ({ editor, range }) => {
//           editor
//             .chain()
//             .focus()
//             .deleteRange(range)
//             .setMark('italic')
//             .run()
//         },
//       },
//     ].filter(item => item.title.toLowerCase().startsWith(query.toLowerCase())).slice(0, 10)
//   },

//   render: () => {
//     let component
//     let popup

//     return {
//       onStart: (props) => {
//         component = new VueRenderer(CommandsList, {
//           // using vue 2:
//           // parent: this,
//           // propsData: props,
//           props,
//           editor: props.editor,
//         })

//         if (!props.clientRect)
//           return

//         popup = tippy('body', {
//           getReferenceClientRect: props.clientRect,
//           appendTo: () => document.body,
//           content: component.element,
//           showOnCreate: true,
//           interactive: true,
//           trigger: 'manual',
//           placement: 'bottom-start',
//         })
//       },

//       onUpdate(props) {
//         component.updateProps(props)

//         if (!props.clientRect)
//           return

//         popup[0].setProps({
//           getReferenceClientRect: props.clientRect,
//         })
//       },

//       onKeyDown(props) {
//         if (props.event.key === 'Escape') {
//           popup[0].hide()

//           return true
//         }

//         return component.ref?.onKeyDown(props)
//       },

//       onExit() {
//         popup[0].destroy()
//         component.destroy()
//       },
//     }
//   },
// }
