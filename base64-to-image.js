const base64img = require('base64-img');
const nanoid =require('nanoid');


module.exports.base64Hook = (ctx) => {
    // field is image
    for (const key in ctx.data) {
        if (ctx.data.hasOwnProperty(key)) {
            if (key.search(new RegExp('image'))>-1  && ctx.data[key].search(new RegExp("data:image"))>-1 ) {
                const img_field = ctx.data[key];

                let img_url = ""
                // get image location
                if (ctx.app) {
                    try {
                        img_url =  ctx.app.get('images_dir');
                    } catch (error) {
                        img_url = "./images";
                        
                    }
                }

                // get image extention
                let parse_part = (e) => {
                    return e.search(new RegExp('image')) >-1;
                }
                
                
                //image_ext(img_field)
                
                // create image name 
                let img_name = "".concat(nanoid(20)) //.concat(".").concat(image_ext(img_field))
                
                
                // save image
                
                const image_field_url = base64img.imgSync(img_field,img_url,img_name)
                
                
                img_ext = img_field.split(";").find(
                    (e) => { return e.search(new RegExp("image"))>-1}
                ).split("/").find(
                    (e) => { return e.search(new RegExp("image")) == -1 }
                );

                try {
                    if (img_ext == 'jpeg' || img_ext == 'JPEG') {
                        ctx.data[key] = ctx.app.get('image_url').concat('/').concat(img_name).concat(".").concat('jpg');
                    }else{
                        ctx.data[key] = ctx.app.get('image_url').concat('/').concat(img_name).concat(".").concat(img_ext);
                    }
                    
                } catch (error) {
                    console.error("you are not define image_url in feathers app config")
                }

                
                
            }
        }
    }
    

    // affect to data

}