# feathers-hook
@elsekoya/feathers-hook 

this package is feathersjs hook for create and update service methode to convert field name that contain 'image' and contain base64 string to file in drive and save url of file to field

# how to use

1-define image dir and image_url var in  config/default.json
 "image_dir":"../public/images"
 "image_url":"/images"

2- import in app.hooks.js
const {base64Hook} = require("./base64-to-image")


3- 
{
    all: [ log() ],
    find: [],
    get: [],
    create: [base64Hook],
    update: [base64Hook],
    patch: [base64Hook],
    remove: []
  }

5 - add
app.use(express.json({limit:'10mb'}));
app.use(express.urlencoded({ extended: true,limit:'10mb' }));
