<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\DB;

class CompanyController extends Controller
{
    // ==========================
    // LIST ALL COMPANIES
    // ==========================
    public function index()
    {
        return Company::all();
    }

    // ==========================
    // CREATE COMPANY
    // ==========================
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'              => 'required|string',
            'monthly_posts'     => 'required|integer',
            'monthly_videos'    => 'required|integer',

            'customer_type'     => 'required|in:business,individual',
            'primary_contact'   => 'nullable|string',
            'sales_person'      => 'nullable|string',
            'display_name'      => 'nullable|string',
            'email'             => 'nullable|email',
            'office_phone'      => 'nullable|string',
            'mobile_phone'      => 'nullable|string',
            'address'           => 'nullable|string',
            'job_card'          => 'nullable|string',
        ]);

        return Company::create($validated);
    }

    // ==========================
    // SHOW COMPANY
    // ==========================
    public function show($id)
    {
        return Company::findOrFail($id);
    }

    // ==========================
    // UPDATE COMPANY
    // ==========================
    public function update(Request $request, $id)
    {
        $company = Company::findOrFail($id);

        $validated = $request->validate([
            'name'              => 'required|string',
            'monthly_posts'     => 'required|integer',
            'monthly_videos'    => 'required|integer',

            'customer_type'     => 'required|in:business,individual',
            'primary_contact'   => 'nullable|string',
            'sales_person'      => 'nullable|string',
            'display_name'      => 'nullable|string',
            'email'             => 'nullable|email',
            'office_phone'      => 'nullable|string',
            'mobile_phone'      => 'nullable|string',
            'address'           => 'nullable|string',
            'job_card'          => 'nullable|string',
        ]);

        $company->update($validated);

        return $company;
    }

    // ==========================
    // DELETE COMPANY
    // ==========================
    public function destroy($id)
    {
        return Company::destroy($id);
    }

    // ==========================
    // ANALYTICS
    // ==========================
    public function analytics($id)
    {
        Company::findOrFail($id);

        $analytics = Post::where('company_id', $id)
            ->select(
                DB::raw('MONTH(created_at) as month'),
                DB::raw('COUNT(*) as post_count'),
                DB::raw("SUM(CASE WHEN type = 'video' THEN 1 ELSE 0 END) as video_count")
            )
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->orderBy('month', 'ASC')
            ->get();

        return response()->json($analytics);
    }

    // ==========================
    // SCHEDULED POSTS
    // ==========================
    public function scheduledPosts($id)
    {
        Company::findOrFail($id);

        $posts = Post::where('company_id', $id)
            ->orderBy('scheduled_date', 'ASC')
            ->get();

        return response()->json($posts);
    }

    // ==========================
    // ADD POST
    // ==========================
    public function addPost(Request $request, $companyId)
    {
        $validated = $request->validate([
            'title'          => 'required|string',
            'type'           => 'required|in:photo,video',
            'scheduled_date' => 'required|date',
            'status'         => 'required|in:scheduled,published,deleted',
        ]);

        Company::findOrFail($companyId);

        $post = Post::create([
            'company_id'     => $companyId,
            'title'          => $validated['title'],
            'type'           => $validated['type'],
            'scheduled_date' => $validated['scheduled_date'],
            'status'         => $validated['status'],
        ]);

        return response()->json($post, 201);
    }
}
