// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Button } from '../components/ui/Button'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Card } from '../components/ui/Card'
import { CreateContentModal } from '../components/ui/CreateContentModal'
import { useEffect, useState } from 'react'
import { Sidebar } from '../components/ui/Sidebar'
import { useContent } from '../hooks/useContent'
import { CreateShareModal } from '../components/ui/CreateShareModal'

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [shareopen, setShareOpen] = useState(false);
  const { contents,refresh } = useContent();
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    refresh();
  }, [modalOpen])


  const filteredContents = filter === "all" ? contents : contents.filter((content) => content.type === filter);

  return <div>
    <Sidebar setFilter={setFilter}/>    
    <div className='p-4 ml-72 min-h-screen bg-gray-100 border-2'>
        <CreateContentModal open={modalOpen} onClose={() => {
          setModalOpen(false);
        }} />
        <CreateShareModal open={shareopen} onClose={() => {
          setShareOpen(false)
        }}/>
          <div className='flex justify-end gap-4'>
          <Button size='md' variant='secondary' text='Share Brain' startIcon={<ShareIcon />} onClick={() => {
            setShareOpen(true)
          }}/>
          <Button size="md" variant='primary' text='Add Content' startIcon={<PlusIcon size="sm"/>} onClick={() => {
            setModalOpen(true)
          }}/>
        </div>
        <div className='p-2 flex justify-around flex-wrap'>
          {filteredContents.length === 0 ? (
            <p>No Content Available</p>
          ) : (
            filteredContents.map(({ type, link, text }, index) => (
              <Card key={index} text={text} link={link} type={type} />
            ))
          )}
        </div>
        </div>
      </div>
}
