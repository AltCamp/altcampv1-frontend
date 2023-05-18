import { useState, useEffect, useRef } from 'react'

import { Editor } from '@tinymce/tinymce-react'

export default function RichEditor ({ setBody, body, isSuccess }) {

  return (
    <>
      <Editor
        apiKey='mk3t00giiyqt48pkpkk19x5es04efdg6r5b3ndaa4hz5if9k'
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
