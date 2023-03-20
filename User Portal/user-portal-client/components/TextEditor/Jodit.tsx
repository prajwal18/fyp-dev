import { useRef, useMemo } from 'react'
import JoditEditor from 'jodit-react'

const Jodit = ({ content, setContent }: {content: any, setContent: (value:any) => void}) => {
  const editor = useRef(null);

  const onChange = (e:any) => {
    setContent(e);
  }

  return (
    <JoditEditor
       ref={editor}
        value={content}
        onBlur={onChange} // preferred to use only this option to update the content for performance reasons
        onChange={onChange}
    />
  )
}
export default Jodit