import React, { useState } from 'react';
import axios from 'axios';
import Ascii from './Ascii';

const App = () => {
  const [file, setFile] = useState(null);
  const [resolution, setResolution] = useState(20);
  const [values, setValues] = useState('@%#*+=-:. ');
  const [zoom, setZoom] = useState(0.5);
  const [error, setError] = useState(null);
  const [ascii, setAscii] = useState(null);

  const click = async () => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('resolution', resolution);
    formData.append('values', values);
    const res = await axios.post('/upload', formData);
    if (res.status === 200) {
      setAscii(res.data.ascii);
      setFile(null);
    } else setError('Server error.');
  };

  const handleChange = e => {
    if (!e.target.files[0]) return;
    console.log(e.target.files[0]);
    const types = ['image/jpg', 'image/jpeg', 'image/png'];
    if (!types.includes(e.target.files[0].type)) {
      setFile(null);
      return setError('Invalid file type.');
    }
    if (e.target.files[0].size > 1024 * 1024 * 3) {
      setFile(null);
      return setError('Image too big.');
    }
    setFile(e.target.files[0]);
    setError(null);
  };

  return (
    <div className="form">
      {!ascii ? (
        <form>
          <div className="formField">
            <label htmlFor="Image">
              Image: <span className="desc">JPG, JPEG & PNG up to 3MB. </span>
            </label>
            <input
              type="file"
              name="Image"
              onChange={e => {
                handleChange(e);
              }}
            ></input>
          </div>
          <div className="formField">
            {' '}
            <label htmlFor="resolution">
              Resolution:{' '}
              <span className="desc">Lower value = higher resolution.</span>
            </label>
            <input
              type="range"
              name="resolution"
              value={resolution}
              max={50}
              min={5}
              onChange={e => setResolution(e.target.value)}
              id=""
            />
            <div className="desc center">
              {resolution}x{resolution} pixels = 1 ascii character
            </div>
          </div>
          <div className="formField">
            {' '}
            <label htmlFor="values">
              Values:{' '}
              <span className="desc">Palette (from dark to bright).</span>
            </label>
            <input
              type="text"
              name="values"
              id=""
              value={values}
              onChange={e => setValues(e.target.value)}
            />
          </div>
          <div className="formField"></div>

          <input
            className="btnAsciify"
            type="button"
            value="Asciify!"
            disabled={!file}
            onClick={click}
            accept="image/png, image/jpeg"
          />
          <h3>{error}</h3>
          <div className="desc" style={{ textAlign: 'center' }}>
            By Amit Fisher
          </div>
        </form>
      ) : null}

      {ascii ? (
        <div className="showAscii">
          <div className="controls">
            <button
              className="button"
              onClick={() => {
                setAscii(null);
              }}
            >
              Back
            </button>{' '}
            <button
              onClick={() => {
                navigator.clipboard.writeText(ascii);
              }}
            >
              Copy to clipboard
            </button>
            <div className="zoom">
              <label htmlFor="zoom">Zoom: </label>
              <input
                type="range"
                name="zoom"
                value={zoom}
                step={0.01}
                max={2}
                min={0.1}
                onChange={e => setZoom(e.target.value)}
                id=""
              />
            </div>
          </div>
          <Ascii ascii={ascii} zoom={zoom} />
        </div>
      ) : null}
    </div>
  );
};

export default App;
