import os
import requests

js_url_list = ["https://www.incrementors.com/wp-content/plugins/arforms-form-builder/css/nouislider.css?ver=6.6", "https://www.incrementors.com/wp-content/themes/thegem/css/thegem-preloader.css?ver=5.9.6", "https://www.incrementors.com/wp-content/themes/thegem/css/thegem-reset.css?ver=5.9.6", "https://www.incrementors.com/wp-content/themes/thegem/css/thegem-grid.css?ver=5.9.6", "https://www.incrementors.com/wp-content/themes/thegem/css/thegem-header.css?ver=5.9.6", "https://www.incrementors.com/wp-content/themes/thegem/style.css?ver=5.9.6", "https://www.incrementors.com/wp-content/themes/thegem-child/style.css?ver=5.9.6", "https://www.incrementors.com/wp-content/themes/thegem/css/thegem-layout-perspective.css?ver=5.9.6", "https://www.incrementors.com/wp-content/themes/thegem/css/thegem-widgets.css?ver=5.9.6", "https://www.incrementors.com/wp-content/themes/thegem/css/thegem-new-css.css?ver=5.9.6", "https://www.incrementors.com/wp-content/themes/thegem/css/thegem-perevazka-css.css?ver=5.9.6", "https://www.incrementors.com/wp-content/themes/thegem-child/css/custom-60y1CL7T.css?ver=5.9.6", "https://www.incrementors.com/wp-content/plugins/js_composer/assets/css/js_composer.min.css?ver=8.4.1", "https://www.incrementors.com/wp-content/themes/thegem/css/thegem-js_composer_columns.css?ver=5.9.6", "https://www.incrementors.com/wp-content/themes/thegem/css/thegem-additional-blog-1.css?ver=5.9.6", "https://www.incrementors.com/wp-content/themes/thegem/js/fancyBox/jquery.fancybox.min.css?ver=5.9.6", "https://www.incrementors.com/wp-content/themes/thegem/css/thegem-vc_elements.css?ver=5.9.6", "https://www.incrementors.com/wp-content/plugins/old_mega-addons-for-visual-composer/css/ihover.css?ver=6.5.5", "https://www.incrementors.com/wp-content/plugins/old_mega-addons-for-visual-composer/css/style.css?ver=6.5.5", "https://www.incrementors.com/wp-content/plugins/old_mega-addons-for-visual-composer/css/font-awesome/css/all.css?ver=6.5.5", "https://www.incrementors.com/wp-content/uploads/arforms/maincss/maincss_materialize_outlined_101.css?ver=6.6.39", "https://www.incrementors.com/wp-content/plugins/arforms/css/arf_front.css?ver=6.6", "https://www.incrementors.com/wp-content/plugins/arforms/css/animate.css?ver=6.6", "https://www.incrementors.com/wp-content/themes/thegem/css/icons-fontawesome.css?ver=5.9.6", "https://www.incrementors.com/wp-content/plugins/js_composer/assets/lib/vendor/node_modules/animate.css/animate.min.css?ver=8.4.1", "https://www.incrementors.com/wp-content/themes/thegem/css/thegem-lazy-loading-animations.css?ver=5.9.6", "https://www.incrementors.com/wp-content/themes/thegem/css/thegem-quickfinders.css?ver=5.9.6", "https://www.incrementors.com/wp-content/themes/thegem/css/icons-material.css?ver=5.9.6", "https://www.incrementors.com/wp-content/plugins/old_mega-addons-for-visual-composer/render/../css/statcounter.css?ver=6.5.5", "https://www.incrementors.com/wp-content/plugins/js_composer/assets/lib/vendor/node_modules/@fortawesome/fontawesome-free/css/v4-shims.min.css?ver=8.4.1", "https://www.incrementors.com/wp-content/plugins/js_composer/assets/lib/vendor/node_modules/@fortawesome/fontawesome-free/css/all.min.css?ver=8.4.1", "https://www.incrementors.com/wp-content/plugins/old_mega-addons-for-visual-composer/render/../css/heading.css?ver=6.5.5", "https://www.incrementors.com/wp-content/uploads/arforms/maincss/maincss_materialize_outlined_102.css?ver=6.5.5"]


# Folder to save JS files
output_folder = 'cssfilefolder'
os.makedirs(output_folder, exist_ok=True)

# Download and save each JS file
for url in js_url_list:
    filename = url.split('/')[-1].split('?')[0].replace('-', '_')
    filepath = os.path.join(output_folder, filename)

    try:
        print(f"Downloading: {url}")
        response = requests.get(url)
        response.raise_for_status()  # Raises an error for bad status codes

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(response.text)

        print(f"Saved as: {filepath}")
    except Exception as e:
        print(f"Failed to download {url}: {e}")
