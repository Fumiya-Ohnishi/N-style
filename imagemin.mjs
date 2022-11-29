// const keepfolder = import('imagemin-keep-folder');
// const mozjpeg = import('imagemin-mozjpeg');
// const pngquant = import('imagemin-pngquant');
// const gifsicle = import('imagemin-gifsicle');
// const svgo = import('imagemin-svgo');
import imageminkeepfolder from 'imagemin-keep-folder';
import imageminmozjpeg from 'imagemin-mozjpeg';
import imageminpngquant from 'imagemin-pngquant';
import imagemingifsicle from 'imagemin-gifsicle';
import imageminsvgo from 'imagemin-svgo';

imageminkeepfolder(['src/assets/img/**/*.{jpg,jpeg,png,gif,svg,pdf,doc}'], {
  plugins: [
    imageminmozjpeg({
      quality: 80
    }),
    imageminpngquant({
      quality: [.7, .8]
    }),
    imagemingifsicle(),
    imageminsvgo()
  ],
  replaceOutputDir: output => {
    return output.replace(/img\//, '../../dist/assets/img/')
  }
});
