'use client'

import { Viewer, Worker, type RenderPageProps } from '@react-pdf-viewer/core'
import { toolbarPlugin, type ToolbarSlot } from '@react-pdf-viewer/toolbar'
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
} from 'lucide-react'

import { Button } from '@kyrian/ui'

import packageJson from '../../../../../../package.json'

import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import '@react-pdf-viewer/toolbar/lib/styles/index.css'

type MonographViewProps = {
  url: string
}

const pdfjsVersion = packageJson.dependencies['pdfjs-dist']

const MonographView = ({ url }: MonographViewProps) => {
  // Disable text selection
  const renderPage = (props: RenderPageProps) => {
    return (
      <>
        {props.canvasLayer.children}
        <div style={{ userSelect: 'none' }}>{props.textLayer.children}</div>
        {props.annotationLayer.children}
      </>
    )
  }

  const toolbarPluginInstance = toolbarPlugin()
  const { Toolbar } = toolbarPluginInstance

  return (
    <Worker
      workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}
    >
      <div className='rpv-core__viewer relative flex h-screen'>
        <div className='bg-card absolute right-1/2 top-4 z-10 flex translate-x-1/2 translate-y-0 items-center rounded-lg border p-4'>
          <Toolbar>
            {(slots: ToolbarSlot) => {
              return (
                <div className='flex flex-row items-center'>
                  <div className='flex flex-row items-center'>
                    <div className='flex-1'>
                      <slots.ZoomOut>
                        {(props) => (
                          <Button
                            size='sm'
                            className='mr-2 rounded-full'
                            onClick={props.onClick}
                          >
                            <ZoomOutIcon size={16} />
                          </Button>
                        )}
                      </slots.ZoomOut>
                    </div>

                    <div className='flex-1'>
                      <slots.ZoomIn>
                        {(props) => (
                          <Button
                            size='sm'
                            className='mr-2 rounded-full'
                            onClick={props.onClick}
                          >
                            <ZoomInIcon size={16} />
                          </Button>
                        )}
                      </slots.ZoomIn>
                    </div>
                  </div>

                  <div className='flex flex-row items-center'>
                    <div className='flex-1'>
                      <slots.GoToPreviousPage>
                        {(props) => (
                          <Button
                            size='sm'
                            variant='ghost'
                            className='mr-2 rounded-full'
                            onClick={props.onClick}
                          >
                            <ChevronLeft size={16} />
                          </Button>
                        )}
                      </slots.GoToPreviousPage>
                    </div>

                    <div className='flex-1'>
                      <slots.CurrentPageLabel>
                        {(props) => (
                          <div className='text-sm font-medium text-gray-500'>
                            {props.currentPage + 1} / {props.numberOfPages}
                          </div>
                        )}
                      </slots.CurrentPageLabel>
                    </div>

                    <div className='flex-1'>
                      <slots.GoToNextPage>
                        {(props) => (
                          <Button
                            size='sm'
                            variant='ghost'
                            className='ml-2 rounded-full'
                            onClick={props.onClick}
                          >
                            <ChevronRight size={16} />
                          </Button>
                        )}
                      </slots.GoToNextPage>
                    </div>
                  </div>
                </div>
              )
            }}
          </Toolbar>
        </div>

        <div className='flex-1 overflow-hidden'>
          <Viewer
            fileUrl={url}
            plugins={[toolbarPluginInstance]}
            renderPage={renderPage}
          />
        </div>
      </div>
    </Worker>
  )
}

export default MonographView
