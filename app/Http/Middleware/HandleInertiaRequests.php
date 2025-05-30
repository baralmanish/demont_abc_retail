<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;
use App\Models\SocialLink;
use App\Models\Category;
use App\Models\Cart;
use App\Models\Testimonial;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $categories = Category::orderBy('name', 'asc')->get();
        $socialLink = SocialLink::first();
        $testimonials = Testimonial::where('status', 'active')->get();
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'meta' => [
                'title' => 'ABC Retail - Your Online Supermarket',
                'description' => 'Best online supermarket in UAE. Get groceries, electronics, and more.',
                'keywords' => 'online shopping, ABC Retail, supermarket, UAE',
            ],
            'site' => [
                'categories' => $categories,
                'socialLink' => $socialLink,
                'testimonials' => $testimonials,
            ],
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
            ],
            'cartItems' => fn () => Cart::getCartItems(),
            'url' => $request->url(),
            'ziggy' => app()->environment('local') ? fn (): array => [
                ...(new Ziggy())->toArray(),
                'location' => $request->url(),
            ] : null
        ];
    }
}