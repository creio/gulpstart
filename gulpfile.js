var gulp       = require('gulp'), // Подключаем Gulp
	sass         = require('gulp-sass'), //Подключаем Sass пакет,
	jade         = require('gulp-jade'),
	browserSync  = require('browser-sync'), // Подключаем Browser Sync
	concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
	notify       = require('gulp-notify'), // Уведомления
	uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
	cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
	csscomb      = require('gulp-csscomb'), // Упорядочивание
	rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
	plumber      = require('gulp-plumber'),
	del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
	imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
	pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
	cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
	autoprefixer = require('gulp-autoprefixer'), // Авто добавление префиксов
	sftp         = require('gulp-sftp'); //Отправка на сервер

// SASS
gulp.task('sass', function(){ // Создаем таск Sass
	return gulp.src('app/sass/**/*.sass') // Берем источник
		.pipe(sass().on('error', notify.onError(
		{
			message: "<%= error.message %>",
			title  : "Sass Error!"
			}))
		)
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
		.pipe(csscomb()) // Комбинирование
		.pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
		.pipe(notify('SASS - хорошая работа!'))
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
		});

// Live reload
gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'app' // Директория для сервера
		},
		notify: false // Отключаем уведомления
	});
});

// JS
gulp.task('script', function() {
	return gulp.src([ // Берем сжатые библиотеки
		'bower_components/jquery/dist/jquery.min.js' // Берем jQuery
		])
		.pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});

gulp.task('mainjs', function() {
	return gulp.src([ // Берем все необходимые библиотеки
		'app/js/main.js'
		])
		.pipe(concat('main.min.js')) // Собираем их в кучу в новом файле main.min.js
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});

gulp.task('scripts', ['script', 'mainjs'], function() {
	return gulp.src([ // Берем все необходимые библиотеки
		'bower_components/fullpage.js/vendors/jquery.slimscroll.min.js',
		'bower_components/fullpage.js/dist/jquery.fullpage.min.js',
		'bower_components/howler.js/howler.js',
		'bower_components/clay/dist/clay.js'
		])
		.pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});

// Css
gulp.task('css', ['sass'], function() {
	return gulp.src([ // Выбираем файлы для минификации
		'app/css/main.css'
		])
		.pipe(cssnano()) // Сжимаем
		.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
		.pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});

// Fonts
gulp.task('fonts', function() {
	return gulp.src([ // Берем все необходимые шрифты
		'bower_components/font-awesome/fonts/*.+(otf|eot|ttf|svg|woff|woff2)' // Берем font-awesome
		])
		.pipe(gulp.dest('app/fonts')); // Выгружаем в папку app/fonts
});

// Jade
gulp.task('jade', function(){
	gulp.src('app/jade/*.jade')
		.pipe(plumber())
		.pipe(jade({pretty: true}))
		.on('error', console.log)
		.pipe(gulp.dest('app/'))
		.pipe(browserSync.reload({stream: true}));
});

// Sync reload
gulp.task('watch', ['browser-sync', 'css', 'scripts', 'fonts'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']); // Наблюдение за sass файлами
	gulp.watch('app/jade/**/*.jade', ['jade']);
	gulp.watch('app/**/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

// Del
gulp.task('clean', function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});

// Img
gulp.task('img', function() {
	return gulp.src('app/img/**/*') // Берем все изображения из app
		.pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

// Build
gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {

	var buildCss = gulp.src([ // Переносим стили, библиотеки в продакшен
		'app/css/main.css',
		'app/css/main.min.css'
		])
	.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
	.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
	.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('app/*.+(html|php|xml|txt)') // Переносим нужные файлы в продакшен
	.pipe(gulp.dest('dist'))
	.pipe(notify('BUILD - хорошая работа!'));
});

// Clear Cache
gulp.task('clear', function (callback) {
	return cache.clearAll();
});

// Deploy sftp
gulp.task('sftp', function () {
	return gulp.src('dist/**/*')
		.pipe(sftp({
			host: 'website.com',
			user: 'johndoe',
			pass: '1234',
			remotePath: '/www/website/public_html/' // Путь на сервере
		}))
		.pipe(notify('SFTP - хорошая работа!'));
});

gulp.task('default', ['watch']);