<?php
$post_id = isset( $_GET['post'] ) ? $_GET['post'] : 0;
$ctx = stream_context_create(array('http' => array('timeout' => 10))); 
$article = '';
$article_latest = '';
$article = @file_get_contents('https://feeds.blogcertified.com/posts/' . $post_id, 0, $ctx);
$article_latest = @file_get_contents('https://feeds.blogcertified.com/posts?type=order_desc&categories=1122&num_of_posts=4', 0, $ctx);

if ( ! empty( $article ) ) {
	$article = json_decode($article);
	$article = $article->data;

	if ( ! empty( $article ) ) {
		$article = getPost( $article );
	}
} else {
	header('Location: https://' . $_SERVER['SERVER_NAME'] . '/news-page.php');
	exit;
}

if ( ! empty( $article_latest ) ) {
	$article_latest = json_decode($article_latest);
	$article_latest = $article_latest->data;

	if ( ! empty( $article_latest ) ) {
		$article_latest_arr = [];
		foreach ( $article_latest as $al_k => $al_v ) {
			$article_latest_arr[ $al_k ] = getPost( $al_v );
			$article_latest_arr[ $al_k ]->share = generateShareLinks( $article_latest_arr[ $al_k ]->share );
		}
	}
}

$share_links = generateShareLinks( $article->share );

function getPost( $article ) {
	$pattern = '/^([ |\t]*?)([^ |\t].*?)([ |\t]*?)$/m';
	$article->content = preg_replace($pattern, "<p>$2</p>", $article->content);
	$date = new DateTime($article->date);
	$article->date = $date->format('F d');
	$article->url = "https://" . $_SERVER['SERVER_NAME'] . '/news-single.php?post=' . $article->id;
	$article->share = new \stdClass();
	$article->share->title = urlencode($article->title);
	$article->share->description = urlencode($article->description);
	$article->share->image = urlencode($article->image);
	$article->share->url = urlencode($article->url);

	return $article;
}

function generateShareLinks( $share ) {
	$links['facebook'] = [
		'link'  => 'https://www.facebook.com/sharer.php?s=100&p[title]='. $share->title .'&u='. $share->url
						.'&t='. $share->title .'&p[summary]='. $share->description .'&p[url]='. $share->url,
		'class' => 'fb',
	];

	$links['plus'] = [
		'link'  => 'https://plus.google.com/share?url='. $share->url,
		'class' => 'gg',
	];

	$links['twitter'] = [
		'link'  => 'https://twitter.com/intent/tweet?url='. $share->url .'&text='. $share->description,
		'class' => 'tw',
	];

	$links['pinterest'] = [
		'link'  => 'https://www.pinterest.com/pin/create/button/?media='. $share->image .'&url='. $share->url
						.'&description='. $share->description,
		'class' => 'pp',
	];

	$links['blogger'] = [
		'link'  => 'https://blogger.com/blog-this.g?t='. $share->description .'&n='. $share->title .'&u='. $share->url,
		'class' => 'bb'
	];

	$links['linkedin'] = [
		'link'  => 'https://www.linkedin.com/shareArticle?mini=true&url='. $share->url .'&title='
						. $share->title .'&summary='. $share->description .'&source='. $share->image,
		'class' => 'in',
	];

	$links['reddit'] = [
		'link'  => 'http://reddit.com/submit?url='. $share->url .'&title='. $share->title,
		'class' => 'rd',
	];

	$result = '';
	foreach ( $links as $link_k => $link ) {
		$result .= '<div class="shr-box-dropdown-item">';
			$result .= '<a class="shr-box-item '. $link["class"] .'" href="'. $link["link"] .'" target="_blank"></a>';
		$result .= '</div>';
	}

	return $result;
}
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-97855694-13"></script>
	<script>
	  window.dataLayer = window.dataLayer || [];
	  function gtag(){dataLayer.push(arguments);}
	  gtag('js', new Date());

	  gtag('config', 'UA-97855694-13');
	</script>
	
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="format-detection" content="telephone=no">
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1">

	<title>VODXS - Visual on demand experience solution</title>
	<meta name='description' content="" />
	<meta name="keywords" content="" />

	<meta property="og:locale" content="en_US" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="<?php echo $article->title; ?>" />
	<meta property="og:description" content="<?php echo $article->description; ?>" />
	<meta property="og:url" content="<?php echo $article->url; ?>" />
	<meta property="og:site_name" content="VODXs" />
	<meta property="og:image" content="<?php echo $article->image; ?>" />

	<script type="application/ld+json">
	{
	  "@context": "http://schema.org",
	  "@type": "LocalBusiness",
	  "logo": "https://www.vodxs.com/img/logo.png",
	  "image": [
	    "https://www.vodxs.com/img/logo.png"
	   ],
	  "@id": "https://www.vodxs.com/",
	  "name": "VODXS - Visual on demand experience solution",
	  "url": "https://www.vodxs.com/",
	  "sameAs" : [
	      "https://www.facebook.com/visualondemand/",
	      "https://www.instagram.com/vodx_s/",
	      "https://plus.google.com/u/2/116615840097319962614",
	      "https://www.youtube.com/channel/UCkKFthxRwVsovxfoLwhc88Q?view_as=subscriber",
	      "https://twitter.com/vodx_s",
	      "https://vimeo.com/user84569529",
	      "https://www.pinterest.com/social7812/",
	      "https://www.blogger.com/blogger.g",
	      "https://www.linkedin.com/in/vodxs-vodxs/",
	      "https://www.flickr.com/people/154416448@N02/",
	      "https://www.reddit.com/user/VODXS",
	      "https://dribbble.com/VODX"
	  ],
	  "priceRange": "HKD,USD,EUR"
	}
	</script>

	<!--[if IE]><link rel="shortcut icon" href=img/favicon.ico"><![endif]-->
	<!-- <link rel="apple-touch-icon-precomposed" sizes="57x57" href="img/apple-touch-icon-57x57.png" />
	<link rel="apple-touch-icon-precomposed" sizes="114x114" href="img/apple-touch-icon-114x114.png" />
	<link rel="apple-touch-icon-precomposed" sizes="72x72" href="img/apple-touch-icon-72x72.png" />
	<link rel="apple-touch-icon-precomposed" sizes="144x144" href="img/apple-touch-icon-144x144.png" />
	<link rel="apple-touch-icon-precomposed" sizes="60x60" href="img/apple-touch-icon-60x60.png" />
	<link rel="apple-touch-icon-precomposed" sizes="120x120" href="img/apple-touch-icon-120x120.png" />
	<link rel="apple-touch-icon-precomposed" sizes="76x76" href="img/apple-touch-icon-76x76.png" />
	<link rel="apple-touch-icon-precomposed" sizes="152x152" href="img/apple-touch-icon-152x152.png" />
	<link rel="icon" type="image/png" href="img/favicon-196x196.png" sizes="196x196" />
	<link rel="icon" type="image/png" href="img/favicon-96x96.png" sizes="96x96" />
	<link rel="icon" type="image/png" href="img/favicon-32x32.png" sizes="32x32" />
	<link rel="icon" type="image/png" href="img/favicon-16x16.png" sizes="16x16" />
	<link rel="icon" type="image/png" href="img/favicon-128.png" sizes="128x128" />
	<link rel="shortcut icon" href="img/favicon-32x32.png" type="image/png">

	<meta name="application-name" content="&nbsp;"/>
	<meta name="msapplication-TileColor" content="#FFFFFF" />
	<meta name="msapplication-TileImage" content="img/mstile-144x144.png" />
	<meta name="msapplication-square70x70logo" content="img/mstile-70x70.png" />
	<meta name="msapplication-square150x150logo" content="img/mstile-150x150.png" />
	<meta name="msapplication-wide310x150logo" content="img/mstile-310x150.png" />
	<meta name="msapplication-square310x310logo" content="img/mstile-310x310.png" /> -->

	<link href="https://fonts.googleapis.com/css?family=Poppins:300,400,700" rel="stylesheet">

	<link rel="stylesheet" type="text/css" href="css/slick.css" />
	<link rel="stylesheet" type="text/css" href="css/animate.css" />
	<link rel="stylesheet" type="text/css" href="css/jquery.fancybox.css" />
	<link rel="stylesheet" type="text/css" href="css/style.css" />

</head>
<body class="inner-page">

							
<!-- BEGIN BODY -->

<div class="main-wrapper">

<!-- BEGIN CONTENT -->

	<main class="content">
		<div class="about-section" id="about">
			<div class="wrapper">
				<div class="about-section-col">
					<p class="about-section-text">
						The Visual On Demand Experience is the brainchild of the Scott Brown.  His passion started in the late 90’s, in general contracting and plumbing design.  After several patents and successful partnerships and licensing opportunities.  Fast forward to 2011, the concept of VODXS<span class="tm">&trade;</span> was conceived as a Digital Display Water Faucet System with his co-founding partner Cory Galakatos.  By 2012 a patent was issued, US D670,664 S, for the Visual On Demand Experience System.<br><br>
						It might not be all that obvious that a company who manufactures and distributes a patented faucet with an integrated LCD Screen world-wide would be in a position to disrupt the advertising industry through blockchain technologies, but often the best ideas come from outside their domains and strategic positioning of technology, relationships and locations.<br><br>
						VODXS<span class="tm">&trade;</span> is Universal Global Technology and media service provider, specializing in digital video advertising in stadiums, resorts, conference centers, casinos and other high traffic venues with the primary focus on “cleaning up” digital advertising with increased efficiency, transparency, cost reduction, and the elimination of fraud.
					</p>
				</div>
				<div class="about-section-col">
					<p class="about-section-text">
						In the United States alone, there are more than 80 million plus faucets distributed across nearly 10 million public bathrooms. People wash their hands, on average, 6-10 times per day, amounting to 100s of billions of hand washing sessions annually in common area washrooms that would rapidly expands our reach, akin to shaving or drinking coffee, is something that nearly everyone does and therefore creates an intriguing opportunity to see how one might go about monetizing the practice.<br><br>
						In 2014, VODXS<span class="tm">&trade;</span> went mainstream with connected faucet. Deployed in various locations, including Caesars Harrah’s Casino Properties, streaming video ads was deemed a success during interviews with various people, and the establishment that bought the first units.<br><br>
						Today, more has over 1,000 active VODXSmartpoints are in 13 different countries with demand growing daily equaling over 17,000,000+ high value active engagements annually. Importantly, the team recognized the real power in their faucets and began to figure out how to connect them and, in the process, create a more effective means of advertising.<br><br>
						VODXS is committed to rapid expansion and market saturation, providing unique technology solutions that create revenue, measured and verifiable results, enhanced environments, promoting transactions and engagements.

					</p>
				</div>
				<div class="about-section-col">
					<div class="about-section-col-image"><img src="img/about-block-image.png" alt=""></div>
					<a href="#win_form" class="about-section-btn fancybox-form">Contact Us</a>
				</div>
			</div>
		</div>
		<div class="news-single">
			<div class="wrapper">
				<div class="news-btns">
					<a href="/" class="news-btn prev"><span>Back</span></a>
				</div>
			</div>
			<div class="wrapper">
				<div class="news-single-left">
					<div class="news-single-box">
						<div class="news-single__img">
							<img src="<?php echo $article->image; ?>" alt="<?php echo $article->title; ?>">
						</div>
						<div class="news-single__name"><?php echo $article->title; ?></div>
						<div class="news-single__inf">
							<span><?php echo $article->author . ', ' . $article->date; ?></span>
							<div class="shr-box">
								<a class="shr-box-icon js-dd-open" href="#"></a>
								<div class="shr-box-dropdown dropdown-block">
									<?php echo $share_links; ?>
								</div>
							</div>
						</div>
						<div class="news-single__text">
							<?php echo $article->content; ?>
						</div>
					</div>
				</div>
				<div class="news-inner">
					<div class="news-inner-title">LATEST <br>STORIES</div>
					<div class="news-inner-list">
						<?php
							if ( ! empty( $article_latest) ) {
								foreach ( $article_latest as $al_k => $al_V ) : ?>
									<div class="news-inner-list__item">
										<div class="news-inner-list__item-img">
											<img src="<?php echo $al_V->image; ?>" alt="<?php echo $al_V->title; ?>">
										</div>
										<a href="/news-single.php?post=<?php echo $al_V->id; ?>" class="news-inner-list__item-name"><?php echo $al_V->title; ?></a>
										<div class="news-inner-list__item-by"><?php echo $al_V->date; ?></div>
										<div class="news-inner-list__item-text"><?php echo $al_V->content; ?></div>
										<div class="shr-box">
											<a class="shr-box-icon js-dd-open" href="#"></a>
											<div class="shr-box-dropdown dropdown-block">
												<?php echo $al_V->share; ?>
											</div>
										</div>
									</div>
						<?php
								endforeach;
							}
						?>
					</div>
				</div>
			</div>
		</div>
	</main>
			
<!-- CONTENT EOF   -->

<!-- BEGIN HEADER -->

	<header>		
		<div class="header-top" id="home">
			<div class="wrapper">
				<div class="header-btn-box">
					<!-- <a href="https://www.vodxs.io/" class="header-btn btn">ICO SITE</a> -->
				</div>
				<div class="header-top-right">
					<div class="shr-box">
						<a href="#" class="shr-box-icon js-dd-open"></a>
						<div class="shr-box-dropdown dropdown-block">
							<div class="shr-box-dropdown-item">
								<a href="https://www.facebook.com/visualondemand/" class="shr-box-item" target="_blank"></a>
							</div>
							<div class="shr-box-dropdown-item">
								<a href="https://www.instagram.com/vodx_s/" class="shr-box-item inst" target="_blank"></a>
							</div>
							<div class="shr-box-dropdown-item">
								<a href="https://plus.google.com/u/2/116615840097319962614" class="shr-box-item gg" target="_blank"></a>
							</div>
							<div class="shr-box-dropdown-item">
								<a href="https://www.youtube.com/channel/UCkKFthxRwVsovxfoLwhc88Q?view_as=subscriber" class="shr-box-item yt" target="_blank"></a>
							</div>
							<div class="shr-box-dropdown-item">
								<a href="https://twitter.com/vodx_s" class="shr-box-item tw" target="_blank"></a>
							</div>
							<div class="shr-box-dropdown-item">
								<a href="https://vimeo.com/user84569529" class="shr-box-item vv" target="_blank"></a>
							</div>
							<div class="shr-box-dropdown-item">
								<a href="https://www.pinterest.com/social7812/" class="shr-box-item pp" target="_blank"></a>
							</div>
							<div class="shr-box-dropdown-item">
								<a href="https://www.blogger.com/blogger.g" class="shr-box-item bb" target="_blank"></a>
							</div>
							<div class="shr-box-dropdown-item">
								<a href="https://www.linkedin.com/in/vodxs-vodxs/" class="shr-box-item in" target="_blank"></a>
							</div>
							<div class="shr-box-dropdown-item">
								<a href="https://www.flickr.com/people/154416448@N02/" class="shr-box-item sn" target="_blank"></a>
							</div>
							<div class="shr-box-dropdown-item">
								<a href="https://www.reddit.com/user/VODXS" class="shr-box-item rd" target="_blank"></a>
							</div>
							<div class="shr-box-dropdown-item">
								<a href="https://dribbble.com/VODX" class="shr-box-item un" target="_blank"></a>
							</div>
						</div>
					</div>
					<div class="lang-box">
						<a href="#" class="lang-box-current js-dd-open"><i></i></a>
						<div class="lang-box-dropdown dropdown-block">
							<a href="#" class="lang-box-item"></a>
							<a href="#" class="lang-box-item france"></a>
							<a href="#" class="lang-box-item china"></a>
							<a href="#" class="lang-box-item spain"></a>
							<a href="#" class="lang-box-item korea"></a>
							<a href="#" class="lang-box-item japan"></a>
						</div>
					</div>
				</div>
				<div class="header-pdf">
					<a href="https://www.vodx.io/" class="header-btn btn" target="_blank">ICO SITE</a>
					<div class="header-pdf-text">DOWNLOAD THE VODXs<span>&trade;</span> WHITE PAPER</div>
					<div class="header-pdf-block">
						<a href="wp" class="header-pdf-btn btn">DOWNLOAD<i></i></a>
						<div class="header-pdf-block-dd">COMING SOON!</div>
					</div>
				</div>
			</div>
		</div>	
		<div class="header-middle">
			<div class="video video_auto">
				<video preload="true" muted="muted" autoplay="autoplay" loop="loop" id="video" poster="img/News Page Banner Thumb.jpg" class="video-bg" playsinline="playsinline" webkit-playsinline="webkit-playsinline" src="video/THE NEWS BANNER.mp4">
	        	</video>
			</div>
		</div>
		<div class="header-bottom">
			<a href="https://t.me/VisualOnDemand" class="tg-chat" target="_blank"></a>
			<div class="header-menu-wrapper">
				<div class="header-menu-wrapper">
				<div class="header-menu">
					<a href="/#home" class="header-menu-link">HOME</a>
					<a href="#about" class="header-menu-link header-menu-link_about">ABOUT</a>
					<a href="/#faucet" class="header-menu-link">VODXS<span>&trade;</span> FAUCET</a>
					<a href="/#network" class="header-menu-link">VODXS<span>&trade;</span> NETWORK</a>
					<a href="/#wallet" class="header-menu-link">VODX<span>&trade;</span> WALLET</a>
					<a href="sponsor.html" class="header-menu-link">VODXSponsor<span>&trade;</span></a>
					<a href="news-page.php" class="header-menu-link">NEWS</a>
				</div>
			</div>
			</div>
		</div>
	</header>
	
<!-- HEADER EOF   -->	

<!-- BEGIN FOOTER -->	
	
	<footer>
		<div class="wrapper">
			<div class="sbscrb-box">
				<div class="sbscrb-text">SIGN UP FOR NEWS AND UPDATES</div>
				<div class="sbscrb-field">
					<input type="text" class="sbscrb-input" placeholder="enter email">
					<a href="#" class="sbscrb-btn"></a>
				</div>
			</div>
			<div class="footer-scl">
				<div class="footer-scl-title">THE VODXS<span>&trade;</span> COMMUNITY <div>powered by <a href="https://obitx.com/" target="_blank">OBITX</a></div></div>
				<div class="footer-scl-list">
					<div class="footer-scl-list__item">
						<a href="https://www.facebook.com/visualondemand/" class="footer-scl-link" target="_blank"></a>
					</div>
					<div class="footer-scl-list__item">
						<a href="https://www.instagram.com/vodx_s/" class="footer-scl-link inst" target="_blank"></a>
					</div>
					<div class="footer-scl-list__item">
						<a href="https://plus.google.com/u/2/116615840097319962614" class="footer-scl-link gg" target="_blank"></a>
					</div>
					<div class="footer-scl-list__item">
						<a href="https://www.youtube.com/channel/UCkKFthxRwVsovxfoLwhc88Q?view_as=subscriber" class="footer-scl-link yt" target="_blank"></a>
					</div>
					<div class="footer-scl-list__item">
						<a href="https://twitter.com/vodx_s" class="footer-scl-link tw" target="_blank"></a>
					</div>
					<div class="footer-scl-list__item">
						<a href="https://vimeo.com/user84569529" class="footer-scl-link vv" target="_blank"></a>
					</div>
					<div class="footer-scl-list__item">
						<a href="https://www.pinterest.com/social7812/" class="footer-scl-link pp" target="_blank"></a>
					</div>
					<div class="footer-scl-list__item">
						<a href="https://www.blogger.com/blogger.g" class="footer-scl-link bb" target="_blank"></a>
					</div>
					<div class="footer-scl-list__item">
						<a href="https://www.linkedin.com/in/vodxs-vodxs/" class="footer-scl-link in" target="_blank"></a>
					</div>
					<div class="footer-scl-list__item">
						<a href="https://www.flickr.com/people/154416448@N02/" class="footer-scl-link sn" target="_blank"></a>
					</div>
					<div class="footer-scl-list__item">
						<a href="https://www.reddit.com/user/VODXS" class="footer-scl-link rd" target="_blank"></a>
					</div>
					<div class="footer-scl-list__item">
						<a href="https://dribbble.com/VODX" class="footer-scl-link un" target="_blank"></a>
					</div>
				</div>
			</div>
			<div class="footer-logo-box">
				<a href="#home" class="footer-logo smoothscroll"><img src="img/footer-logo.png" alt=""></a>
				<div class="copy">COPYRIGHT &copy; VODXS 2018 ALL RIGHTS RESERVED</div>
			</div>
		</div>	
	</footer>
	
<!-- FOOTER EOF   -->

<!-- POPUPS -->
	<div class="popup">
		<div class="window-open window-open_form" id="win_form">
			<div class="window-open-wrapper">
				<div class="window-open-img"><img src="img/logo-vodxs-modal.png" alt=""></div>
				<div class="window-open-txt">FILL OUT THIS FORM BELOW TO GET STARTED TODAY!</div>
				<div class="box-form">
					<form>
						<div class="box-fields clearfix">
							<div class="box-field">
								<input type="text" placeholder="Your Full Name*" class="form-control" required="required">
							</div>
							<div class="box-field">
								<input type="text" placeholder="Email Address*" class="form-control" required="required">
							</div>
							<div class="box-field">
								<input type="text" placeholder="Company Name" class="form-control">
							</div>
							<div class="box-field">
								<input type="text" placeholder="Phone" class="form-control">
							</div>
						</div>
						<div class="box-field box-field-textarea">
							<textarea placeholder="Note" class="form-control" maxlength="400"></textarea>
						</div>
						<div class="box-form-btns">
							<div class="box-form-note">*required</div>
							<div class="g-recaptcha" data-sitekey="6LdkxloUAAAAAJ5uoyQU9lPVFaoVS3Eqd5teE40I"></div>
							<input type="submit" class="btn btn_form" value="Submit">
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- BODY EOF   -->
	
	<script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>		
	<script type="text/javascript" src="js/jquery-migrate-1.4.1.min.js" ></script>

	<script type="text/javascript" src="js/components/slick.js" ></script>
	<script type="text/javascript" src="js/components/parallaxie.js" ></script>
	<script type="text/javascript" src="js/components/wow.js" ></script>
	<script type="text/javascript" src="js/components/jquery.webticker.min.js" ></script>
	<script type="text/javascript" src="js/components/jquery.fancybox.js" ></script>

	<!--
	<script type="text/javascript" src="js/components/jquery.formstyler.js" ></script>
	<script type="text/javascript" src="js/components/jquery.mCustomScrollbar.js" ></script>
	-->
	<script type="text/javascript" src="js/subscribe.js" ></script>
	<script type="text/javascript" src="js/custom.js" ></script>
</body>
</html>
