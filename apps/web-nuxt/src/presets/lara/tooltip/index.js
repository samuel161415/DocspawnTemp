export default {
    root: ({ context, props }) => ({
        class: [
            // Position and Shadows
            'absolute',
            '',
            '',
            // Spacing
            {
                'py-0 px-1': context?.right || context?.left || (!context?.right && !context?.left && !context?.top && !context?.bottom),
                'py-1 px-0': context?.top || context?.bottom
            }
        ]
    }),
    arrow: ({ context, props }) => ({
        class: [
            // Position

            'absolute',
            'shadow-lg',
            'p-fadein',

            // Size
            'w-1',
            'h-1',

            // Shape
            'bg-transparent',
            'border-transparent',
            'border-solid',
            {
                'border-y-[0.25rem] border-r-[0.25rem] border-l-0 border-r-surface-50': context?.right || (!context?.right && !context?.left && !context?.top && !context?.bottom),
                'border-y-[0.25rem] border-l-[0.25rem] border-r-0 border-l-surface-50': context?.left,
                'border-x-[0.25rem] border-t-[0.25rem] border-b-0 border-t-surface-50': context?.top,
                'border-x-[0.25rem] border-b-[0.25rem] border-t-0 border-b-surface-50': context?.bottom
            },

            // Spacing
            {
                '-mt-1 ': context?.right || (!context?.right && !context?.left && !context?.top && !context?.bottom),
                '-mt-1': context?.left,
                '-ml-1': context?.top || context?.bottom
            }
        ]
    }),
    text: {
        class: ['p-3', 'bg-surface-50 dark:bg-surface-600', 'text-gray-500 dark:text-surface-200', 'text-base', 'leading-none', 'rounded-md', 'font-poppins', 'break-words']
    }
};
