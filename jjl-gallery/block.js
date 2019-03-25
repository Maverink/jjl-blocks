const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload } = wp.editor;
const { Button } = wp.components;

registerBlockType("jjl-plugin/jjl-block-jjl-gallery", {
  title: __("JJL Gallery"),
  description: "Jimma Jamma Lulu custom Gallery block",
  icon: "universal-access-alt",
  category: "layout",
  attributes: {
    title: {
      type: "array",
      source: "children",
      selector: "h1"
    },
    mediaImages: {
      type: "array"
    },
    mediaIDs: {
      type: "array"
    },
    mediaURLs: {
      type: "array"
    }
  },

  edit: ({
    className,
    setAttributes,
    attributes: { mediaIDs, mediaURLs, mediaImages }
  }) => {
    const onSelectImages = newImages => {
      setAttributes({
        mediaImages: newImages,
        mediaIDs: newImages,
        mediaURLs: newImages.map(({ url }) => {
          console.log(url);
          return url;
        })
      });
    };

    // function loopAndDisplay(arr, item) {
    //   arr.map(item => <img src={item} />);
    // }

    //Displays the Editor images
    const displayEditorImages = images => {
      return (
        //Loops through the images
        images.map(image => {
          return (
            <div className="jjl-editor-gallery-item-container">
              <img className="jjl-editor-gallery-item" src={image.url} />
            </div>
          );
        })
      );
    };

    return (
      <div className={className}>
        <div className="column">
          {mediaImages ? (
            <div className="jjl-editor-gallery-grid">
              {displayEditorImages(mediaImages)}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="upload-image">
          <MediaUpload
            multiple="true"
            onSelect={onSelectImages}
            type="image"
            value={mediaIDs}
            render={({ open }) => (
              <Button
                onClick={open}
                className={mediaIDs ? "image-button" : "button button-large"}
              >
                {/* {!mediaIDs ? __("Upload Image") : <img src={mediaURLs} />} */}
              </Button>
            )}
          />
        </div>
      </div>
    );
  },
  save: ({ className, attributes: { mediaURLs, mediaIDs, mediaImages } }) => {
    //Displays the Front images
    const displayFrontImages = images => {
      return (
        //Loops through the images
        images.map(image => {
          return (
            <div className="jjl-front-gallery-item-container">
              <a
                href={"#jjl-front-gallery-modal" + image.id}
                className="jjl-front-gallery-item-anchor"
              >
                <img className="jjl-front-gallery-item" src={image.url} />
              </a>
              {console.log("image id is " + image.id)}
            </div>
          );
        })
      );
    };

    //Create Images Modal on the front end

    const createImagesModal = images => {
      return images.map(image => {
        return (
          <div
            className="jjl-front-gallery-modal"
            id={"jjl-front-gallery-modal" + image.id}
          >
            <div className="jjl-front-gallery-modal-content">
              <a href="/corso/gallery">
                <img
                  className="jjl-front-gallery-modal-content-close"
                  src="/corso/wp-content/plugins/jjl-blocks/jjl-gallery/assets/icons/close-white.svg"
                />
              </a>
              <img
                className="jjl-front-gallery-modal-content-image"
                src={image.url}
              />

              <div className="jjl-front-gallery-modal-controls">
                <a
                  className="jjl-front-gallery-modal-controls-left"
                  href={"#jjl-front-gallery-modal" + (parseInt(image.id) + 1)}
                >
                  <img src="/corso/wp-content/plugins/jjl-blocks/jjl-gallery/assets/icons/arrow-left.svg" />
                </a>

                <a
                  className="jjl-front-gallery-modal-controls-right"
                  href={"#jjl-front-gallery-modal" + (parseInt(image.id) - 1)}
                >
                  <img src="/corso/wp-content/plugins/jjl-blocks/jjl-gallery/assets/icons/arrow-right.svg" />
                </a>
              </div>
            </div>
          </div>
        );
      });
    };

    return (
      <div className={className}>
        <div className="column">
          {mediaImages ? (
            <div className="jjl-front-gallery-grid">
              {displayFrontImages(mediaImages)}
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="column-modals">
          {mediaImages ? (
            <div className="jjl-front-gallery-modals">
              {createImagesModal(mediaImages)}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
});
