import { useState, useEffect, useRef } from 'react'

import { Editor } from '@tinymce/tinymce-react'

export default function RichEditor ({ setBody, body, isSuccess }) {

  return (
    <>
      <Editor
        apiKey={import.meta.env.VITE_TINY_KEY}
        // onInit={(evt, editor) => (editorRef.current = editor)}
        // initialValue={body}
        value={body}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist',
            'media',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount',
            'emoticons',
            'template',
            'save',
            'pagebreak',
            'codesample',
            'directionality',
            'visualchars',
            'nonbreaking'
          ],
          toolbar:
            'undo redo | bold italic underline strikethrough | fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen | insertfile image media link anchor codesample | ltr rtl',
          codesample_languages: [
            { text: 'HTML/XML', value: 'markup' },
            { text: 'JavaScript', value: 'javascript' },
            { text: 'CSS', value: 'css' },
            { text: 'PHP', value: 'php' },
            { text: 'Ruby', value: 'ruby' },
            { text: 'Python', value: 'python' },
            { text: 'Java', value: 'java' },
            { text: 'C', value: 'c' },
            { text: 'C#', value: 'csharp' },
            { text: 'C++', value: 'cpp' },
            { text: 'Typescript', value: 'typescript' },
            { text: 'React', value: 'jsx' },
            { text: 'Vue', value: 'html' },
            
          ],
          // add template in the future
          body_class: 'tiny-body'
        }}
        onEditorChange={(content, editor) => {
          setBody(content)
          // setContent(editor)
        }}
      />
    </>
  )
}
