
export default function formatDate (inputDate) 
{  const formattedDate = new Date(inputDate)
  return formattedDate.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
});
}
