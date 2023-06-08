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
      <div className='app-flex app-relative app-h-screen rpv-core__viewer'>
        <div className='app-absolute app-z-10 app-flex app-top-4 app-translate-x-1/2 app-translate-y-0 app-p-4 app-right-1/2 app-items-center app-bg-card app-rounded-lg app-border'>
          <Toolbar>
            {(slots: ToolbarSlot) => {
              return (
                <div className='app-flex app-flex-row app-items-center'>
                  <div className='app-flex app-flex-row app-items-center'>
                    <div className='app-flex-1'>
                      <slots.ZoomOut>
                        {(props) => (
                          <Button
                            size='sm'
                            className='app-rounded-full app-mr-2'
                            onClick={props.onClick}
                          >
                            <ZoomOutIcon size={16} />
                          </Button>
                        )}
                      </slots.ZoomOut>
                    </div>

                    <div className='app-flex-1'>
                      <slots.ZoomIn>
                        {(props) => (
                          <Button
                            size='sm'
                            className='app-rounded-full app-mr-2'
                            onClick={props.onClick}
                          >
                            <ZoomInIcon size={16} />
                          </Button>
                        )}
                      </slots.ZoomIn>
                    </div>
                  </div>

                  <div className='app-flex app-flex-row app-items-center'>
                    <div className='app-flex-1'>
                      <slots.GoToPreviousPage>
                        {(props) => (
                          <Button
                            size='sm'
                            variant='ghost'
                            className='app-rounded-full app-mr-2'
                            onClick={props.onClick}
                          >
                            <ChevronLeft size={16} />
                          </Button>
                        )}
                      </slots.GoToPreviousPage>
                    </div>

                    <div className='app-flex-1'>
                      <slots.CurrentPageLabel>
                        {(props) => (
                          <div className='app-text-sm app-font-medium app-text-gray-500'>
                            {props.currentPage + 1} / {props.numberOfPages}
                          </div>
                        )}
                      </slots.CurrentPageLabel>
                    </div>

                    <div className='app-flex-1'>
                      <slots.GoToNextPage>
                        {(props) => (
                          <Button
                            size='sm'
                            variant='ghost'
                            className='app-rounded-full app-ml-2'
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

        <div className='app-flex-1 app-overflow-hidden'>
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
