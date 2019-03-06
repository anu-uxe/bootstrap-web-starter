const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');


var paths = {
    styles: {
        src: 'src/**/*.scss', // paths.styles.src
        public: 'public/css'// paths.styles.public
    },
    scripts: {
        src: 'src/**/*.js', // paths.scripts.src
        public: 'public/js', // paths.scripts.public
        public_vendor: 'public/js/vendor' // paths.scripts.public_vendor
    },

    html: {
        public: 'public/*.html' // paths.html.public
    }
};

// Compile sass into CSS
gulp.task('sass', function () {
    return gulp.src(paths.styles.src, 'sass')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('./map'))
        .pipe(gulp.dest(paths.styles.public))
        .pipe(browserSync.stream());
});

// Move web app JS Files to public/js
gulp.task('js', function () {
    return gulp.src('src/scripts/*.js')
        .pipe(gulp.dest(paths.scripts.public))
        .pipe(browserSync.stream());
});


// Move vendor JS Files to public/vendor
gulp.task('js-vendor', function () {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js',
        'src/scripts/vendor/*.js'],
    )
        .pipe(gulp.dest(paths.scripts.public_vendor))
        .pipe(browserSync.stream());
});

//Minify CSS
gulp.task('minify-css', function () {
    return gulp.src(paths.styles.public + '/*.css')
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/css/minified-css'));
});

// Minify CSS
// function minifyCSS() {
//     return (
//       gulp
//         .src("public/css/*.css")
//         .pipe(cleanCSS())
//         .pipe(rename({ suffix: '.min' }))
//         .pipe(gulp.dest("public/css/minified-css"))
//     );
// }

// gulp.task("minify-css", minifyCSS);

// Move Fonts to public/fonts
gulp.task('fonts', function () {
    return gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('public/fonts'));
});

// Move Images to aseets/img
gulp.task('imgs', function () {
    return gulp.src('src/img/*')
        .pipe(gulp.dest('public/assets/img'));
});

//Move material icon font to public/css
gulp.task('font-icons', function () {
    return gulp.src('node_modules/font-awesome/css/font-awesome.css')
        .pipe(gulp.dest(paths.styles.public));
});


// watch files
gulp.task('serve', gulp.series('sass', function () {
    browserSync.init({
        server: './public'
    });

    gulp.watch(paths.styles.src, gulp.parallel('sass')).on('change', browserSync.reload)
    gulp.watch(paths.scripts.src, gulp.parallel('js'))
    gulp.watch(paths.html.public).on('change', browserSync.reload)
    gulp.watch(paths.styles.public + '/*.css', gulp.parallel('minify-css'));
}));


gulp.task('default', gulp.series('js', 'js-vendor', 'minify-css', 'fonts', 'imgs', 'font-icons', 'serve'));