/**
 * Created by 严媛媛 on 2018/1/20.
 */
// 引入依赖包
var gulp = require('gulp'),
    sass = require('gulp-sass'),//SASS编译
    autoprefixer=require('gulp-autoprefixer'),//自动添加浏览器前缀
    rename = require('gulp-rename'), //重命名文件
    uglify = require('gulp-uglify'), //压缩JS
    imagemin = require('gulp-imagemin'), //压缩图片
    minifycss = require('gulp-minify-css'), //压缩css文件
    notify = require('gulp-notify'),//可输出文本，相当于js中的consol.log，用于判断是否任务成功执行
    spritesmith = require('gulp.spritesmith'),//生成精灵图
    del = require('del'),//删除文件
    rev = require('gulp-rev'), //- 对文件名加MD5后缀
    revCollector = require('gulp-rev-collector'),//- 路径替换
    gulpSequence=require('gulp-sequence'),//让gulp任务按顺序（同步）执行，默认异步执行
    runSequence = require('run-sequence'),
    clean   = require('gulp-clean'),//清空文件夹
    //livereload=require('gulp-livereload'),//自动刷新浏览器
    babel = require("gulp-babel");//用于转换es6为es5
    htmlmin = require('gulp-htmlmin');//压缩html代码
    // webpack = require("webpack"),
    // WebpackDevServer = require("webpack-dev-server"),
    // webpackConfig = require("./webpack.config.js");


/**
 * 对图片的处理
 * */
//生成雪碧图
gulp.task('sprite',function(){
    return gulp.src('./dev/images/icon/*')//相对于gulpfile的路径名，同目录下前面加./
        .pipe(spritesmith({
            imgName:'./images/sprites.png',  //保存合并后图片的地址与图片的名称//相对于输出目录的路径
            cssName:'./sass/sprite/sprite.scss',   //保存合并后对于css样式的地址//相对于输出目录的路径
            padding:4, //合成图里图标间距，单位px,如果设置为奇数，会强制+1以保证生成的2x图片为偶数宽高，默认 0
            algorithm:'binary-tree',//
            cssFormat: "scss", //生成的css格式可选[css,scss,sass,less]
            //useimageset: false,// 是否使用 image-set 作为2x图片实现，默认不使用
            // 是否以时间戳为文件名生成新的雪碧图文件，如果启用请注意清理之前生成的文件，默认不生成新文件
            //newsprite: mode === "release", //判断是否发布模式，是就建以时间戳为文件名的文件，否则不建。
            //spritestamp: false,// 给雪碧图追加时间戳，默认不追加
            //css配置
            cssOpts: {
                cssClass: function(item) {
                    // If this is a hover sprite, name it as a hover one (e.g. 'home-hover' -> 'home:hover')
                    if (item.name.indexOf('-hov') !== -1) {
                        return '.icon-' + item.name.replace('-hov', ':hover');
                        // Otherwise, use the name as the selector (e.g. 'home' -> 'home')
                    } else if(item.name.indexOf('-act') !== -1){
                        return '.icon-' + item.name.replace('-hov', ':active');
                    }else {
                        return '.icon-' + item.name;
                    }
                }
            },
            cssTemplate: './dev/sass/scss.handlebars'//相对于gulpfile的路径名，同目录下前面加./
        }))
        .pipe(gulp.dest('./dev'))//输出目录
        .pipe(notify({
            message: 'sprite task complete'
        }));
});
//压缩图片
gulp.task('img', function() {
    return gulp.src('./dev/images/**/*')
        .pipe(gulp.dest('./release/images'))
        .pipe(notify({
            message: 'Images task complete'
        }));
});
/**
 * 对HTML的处理
 * */
//压缩html
gulp.task('html-min', function() {
    //  src/**/*.html  这个代表的是src下边的html文件以及他的子文件下的所有的html文件
    return gulp.src('dev/*.html')
    //.pipe(rename({
    //    suffix: '.min'
    //}))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./release'))
        .pipe(notify({
            message: 'html-min'
        }));
});

/**
 * 对SASS、CSS的处理
 * */
//scss文件编译
gulp.task('sass', function(){
    //sass()方法用于转换sass到css
    return gulp.src('./dev/scss/dev.scss')//需要编译的文件,设置唯一入口
        .pipe(sass({outputStyle: 'expanded'})) // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest('./dev/css'))//输出地址
        .pipe(notify({
            message: 'sass'
        }));
});

//添加css3前缀
gulp.task('fix',function () {
    gulp.src('./dev/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest('./dev/css'));
});

//CSS集合处理任务，压缩，添加MD5后缀
gulp.task('css', function() {
    return gulp.src('./dev/css/dev.css')
    //.pipe(rename({
    //    suffix: '.min'
    //}))
        .pipe(minifycss())
        // .pipe(rev())                                            //- 文件名加MD5后缀
        .pipe(gulp.dest('release/css'))                         //输出文件路径
        .pipe(notify({
            message: 'css'
        }))
        // .pipe(rev.manifest())                                   //- 生成一个rev-manifest.json
        // .pipe(gulp.dest('./dev/rev'));                          //- 将 rev-manifest.json 保存到 rev 目录内;
});

//将压缩或合并css等后的路径在html发布版本中替换链接
gulp.task('rev', function() {
    gulp.src(['./dev/rev/*.json', './release/index.html'])   //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
        .pipe(revCollector())                                   //- 执行文件内css名的替换
        .pipe(gulp.dest('./release'))       //- 替换后的文件输出的目录
        .pipe(notify({
            message: 'rev'
        }));
});



// Clean 任务执行前，先清除之前生成的文件
gulp.task('clean', function(cb) {
    del(['./dev/css', './dev/sass/sprite', './release/images', './release/css', './release/*.html', './release/images'], cb)
});
// 监听文件: Watch

gulp.task('main', gulpSequence('html-min', 'sprite','img', 'sass','fix', 'css', function() {
    console.log( "输出完成！" );
} ));
gulp.task('watch', function() {
    gulp.watch('dev/scss/*.scss', ['sass']);//参数：监听的文件和文件变动时执行的任务
    gulp.watch('dev/scss/base/*.scss', ['sass']);//参数：监听的文件和文件变动时执行的任务
    gulp.watch('dev/css/*.css', ['css']);
    gulp.watch('dev/images/*/*', ['img']);
    gulp.watch('dev/*.html', ['html-min']);
});
// js
// gulp.task('js', function() {
//     return gulp.src('dev/js/*.js')
//         .pipe(uglify())
//         .pipe(rename({
//             suffix: 'min'
//         }))
//         .pipe(gulp.dest('release/js'));
// });

// es6转es5
/*gulp.task('es5', function(){
   return gulp.src("dev/js/main.js")
       .pipe(babel({
           presets: ['es2015']//es6转es5
           }
       ))
       .pipe(gulp.dest("release/js"));
});*/



